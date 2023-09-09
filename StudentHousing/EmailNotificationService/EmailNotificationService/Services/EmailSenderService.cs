using System.Net;
using System.Net.Mail;
using EmailNotificationService.Models.Options;
using EmailNotificationService.Services.Interfaces;
using Microsoft.Extensions.Options;

namespace EmailNotificationService.Services;

public class EmailSenderService: IEmailSenderService
{
    private readonly SmtpClient _smtpClient;
    private readonly EmailOptions _options;
    public EmailSenderService(IOptions<EmailOptions> options)
    {
        _options = options.Value;

        _smtpClient = new SmtpClient(_options.SmtpServer, _options.Port)
        {
            Credentials = new NetworkCredential(_options.SenderAddress, _options.SenderPassword),
            EnableSsl = true
        };
    }
    public void SendEmail(string receiverAddress, string subject, string message)
    {
        var messageToSend = CreateMessage(receiverAddress, subject, message);

        using var smtpClient = new SmtpClient(_options.SmtpServer, _options.Port)
        {
            Credentials = new NetworkCredential(_options.SenderAddress, _options.SenderPassword),
            EnableSsl = true
        };

        smtpClient.Send(messageToSend);
    }

    private MailMessage CreateMessage(string receiverAddress, string subject, string message)
    {
        var mailMessage= new MailMessage();

        mailMessage.From = new MailAddress(_options.SenderAddress);
        mailMessage.To.Add(new MailAddress(receiverAddress));
        mailMessage.Subject = subject;
        mailMessage.Body = message;
        
        return mailMessage;
    }
}