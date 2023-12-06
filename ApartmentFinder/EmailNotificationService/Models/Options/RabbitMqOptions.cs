namespace EmailNotificationService.Models.Options;

public sealed class RabbitMqOptions
{
    public const string ConfigSectionName = "RabbitMq";

    public required string QueueName { get; init; }
    public required string ExchangeName { get; init; }
}