﻿using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using EmailNotificationService.Models.Options;
using EmailNotificationService.Services.Interfaces;
using Microsoft.Extensions.Options;
using Polly;
using Polly.Registry;

namespace EmailNotificationService.Services;

public class ConsumerService: IHostedService
{
    private readonly IEmailSenderService _emailSenderService;
    private readonly IUserDetailsProvider _userDetailsProvider;
    private readonly RabbitMqOptions _options;
    private readonly IConnection _connection;

    private readonly ResiliencePipeline _networkRetry;
    private readonly ResiliencePipeline _emailRetry;
    public ConsumerService(IEmailSenderService emailSenderService, IUserDetailsProvider userDetailsProvider,
        ResiliencePipelineProvider<string> resiliencePipelineProvider,IOptions<RabbitMqOptions> options)
    {
        _emailSenderService = emailSenderService;
        _userDetailsProvider = userDetailsProvider;
        _options = options.Value;

        _networkRetry = resiliencePipelineProvider.GetPipeline("network-retry");
        _emailRetry = resiliencePipelineProvider.GetPipeline("email-retry");

        var connFactory = new ConnectionFactory()
        {
            HostName = "rabbitmq"
        };
        _connection = connFactory.CreateConnection();
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        Console.WriteLine("Email notification service started.");
        try
        {
            return StartConsumer();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            throw;
        }
    }
    public Task StopAsync(CancellationToken cancellationToken)
    {
        _connection.Close();
        return Task.CompletedTask;
    }
    private Task StartConsumer()
    {
        using var channel = _connection.CreateModel();

        channel.ExchangeDeclare(_options.ExchangeName, ExchangeType.Fanout);
        channel.QueueDeclare(_options.QueueName, exclusive: false, autoDelete: false, durable: true);
        channel.QueueBind(queue: _options.QueueName, exchange: _options.ExchangeName, "");

        var consumer = new EventingBasicConsumer(channel);
        consumer.Received += OnMessageReceived;

        channel.BasicConsume(_options.QueueName, autoAck: true, consumer: consumer);
        Console.Read();
        return Task.CompletedTask;
    }

    private async void OnMessageReceived(object? sender, BasicDeliverEventArgs e)
    {
        try
        {
            var messageBody = e.Body.ToArray();
            var receivedJson = Encoding.UTF8.GetString(messageBody);

            var userId = JsonSerializer.Deserialize<int>(receivedJson);
            var user = await _networkRetry.ExecuteAsync(async _ => await _userDetailsProvider.GetUserDataByIdAsync(userId));

            var notificationMessage =
                $"Dear {user.FirstName}!\n\n" +
                $"You have a new message waiting for you on Student Housing. " +
                $"To check and respond to the message, go to the site and open the messages tab.\n\n" +
                $"This is an auto generated email, please do not respond to it.\n\n";

            await _emailRetry.ExecuteAsync(async ct => await _emailSenderService.SendEmail(
                "szabo.egon2001@gmail.com",
                $"{user.FirstName} {user.LastName}", //TODO change this to actual email
                "Message Notification", notificationMessage));
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
        }
    }
}