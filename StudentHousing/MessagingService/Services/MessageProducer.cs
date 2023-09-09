using System.Text;
using System.Text.Json;
using MessagingService.Models.Options;
using MessagingService.Services.Interfaces;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;

namespace MessagingService.Services;

public class MessageProducer: IMessageProducer
{
    private readonly RabbitMqOptions _options;
    private readonly IConnection _connection;
    public MessageProducer(IOptions<RabbitMqOptions> options)
    {
        _options = options.Value;

        var connFactory = new ConnectionFactory()
        {
            HostName = "rabbitmq"
        };
        _connection = connFactory.CreateConnection();
    }
    public void SendMessage<T>(T message)
    { 
        using var channel = _connection.CreateModel();

        channel.ExchangeDeclare(_options.ExchangeName, ExchangeType.Fanout);
        channel.QueueDeclare(_options.QueueName, exclusive: false, autoDelete: false, durable: true);
        channel.QueueBind( queue: _options.QueueName, exchange: _options.ExchangeName, "");

        var json = JsonSerializer.Serialize(message);
        var messageBody = Encoding.UTF8.GetBytes(json);

        channel.BasicPublish(exchange: _options.ExchangeName, routingKey: "", body: messageBody);
    }
}