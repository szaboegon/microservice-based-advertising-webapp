namespace EmailNotificationService.Services.Interfaces;

public interface IEmailSenderService
{
    Task SendEmail(string receiverAddress, string receiverName, string subject, string message);
}