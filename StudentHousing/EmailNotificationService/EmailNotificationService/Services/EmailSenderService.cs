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
    public void SendEmail(string receiverAddress, string receiverName, string subject, string message)
    {
        var messageToSend = CreateMessage(receiverAddress, receiverName, subject, message);

        using var smtpClient = new SmtpClient();

        smtpClient.Connect(_options.SmtpServer, _options.Port);
        smtpClient.Authenticate(_options.SenderAddress, _options.SenderPassword);

        smtpClient.Send(messageToSend);
    }

    private MimeMessage CreateMessage(string receiverAddress, string receiverName, string subject, string message)
    {
        var mimeMessage= new MimeMessage();

        mimeMessage.From.Add(new MailboxAddress("Student Housing",_options.SenderAddress));
        mimeMessage.To.Add(new MailboxAddress(receiverName, receiverAddress));
        mimeMessage.Subject = subject;
        mimeMessage.Body = new TextPart("plain")
        {
            Text = message
        };
        
        return mimeMessage;
    }
}