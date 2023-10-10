using EmailNotificationService.Models.Exceptions;
using EmailNotificationService.Models.Options;
using EmailNotificationService.Services.Interfaces;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace EmailNotificationService.Services;

public class EmailSenderService: IEmailSenderService
{
    private readonly EmailOptions _options;
    public EmailSenderService(IOptions<EmailOptions> options)
    {
        _options = options.Value;
    }
    public async Task SendEmail(string receiverAddress, string receiverName, string subject, string message)
    {
        try
        {
            var messageToSend = CreateMessage(receiverAddress, receiverName, subject, message);
            using var smtpClient = new SmtpClient();

            await smtpClient.ConnectAsync(_options.SmtpServer, _options.Port);
            await smtpClient.AuthenticateAsync(_options.SenderAddress, _options.SenderPassword);

            await smtpClient.SendAsync(messageToSend);
        }
        catch (Exception ex)
        {
            throw new EmailNotificationFailedException("There was a problem with sending the email notification.", ex);
        }
    }

    private MimeMessage CreateMessage(string receiverAddress, string receiverName, string subject, string message)
    {
        var mimeMessage= new MimeMessage();

        mimeMessage.From.Add(new MailboxAddress(_options.SenderName,_options.SenderAddress));
        mimeMessage.To.Add(new MailboxAddress(receiverName, receiverAddress));
        mimeMessage.Subject = subject;
        mimeMessage.Body = new TextPart("plain")
        {
            Text = message
        };
        
        return mimeMessage;
    }
}