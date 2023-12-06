namespace EmailNotificationService.Models.Options;

public class EmailOptions
{
    public const string ConfigSectionName = "EmailConfig";

    public required string SmtpServer { get; init; }
    public required int Port { get; init; }
    public required string SenderAddress { get; init; }
    public required string SenderName { get; init; }
    public required string SenderPassword { get; init; }
}