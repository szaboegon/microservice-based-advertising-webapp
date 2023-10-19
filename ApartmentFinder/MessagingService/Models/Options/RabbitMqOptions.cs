using System.ComponentModel.DataAnnotations;

namespace MessagingService.Models.Options;

public sealed class RabbitMqOptions
{
    public const string ConfigSectionName = "RabbitMq";

    [Required]
    public required string QueueName { get; init; }
    [Required]
    public required string ExchangeName { get; init; }
}