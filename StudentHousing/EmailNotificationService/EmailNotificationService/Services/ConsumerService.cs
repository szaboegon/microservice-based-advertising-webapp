using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Threading.Channels;
using EmailNotificationService.DataTransferObjects;
using EmailNotificationService.Models.Options;
using Microsoft.Extensions.Options;

namespace EmailNotificationService.Services;

public class ConsumerService: IHostedService
{
    private readonly RabbitMqOptions _options;
    private readonly IConnection _connection;
    private readonly IHostApplicationLifetime _lifetime;
    public ConsumerService(IOptions<RabbitMqOptions> options, IHostApplicationLifetime lifetime)
    {
        _options = options.Value;
        _lifetime = lifetime;

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
            return Start();
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


    public Task Start()
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

    private void OnMessageReceived(object? sender, BasicDeliverEventArgs e)
    {
        var messageBody = e.Body.ToArray();
        var receivedJson = Encoding.UTF8.GetString(messageBody);

        var user = JsonSerializer.Deserialize<UserDetailsDto>(receivedJson);

        var user2 = user;
    }
}