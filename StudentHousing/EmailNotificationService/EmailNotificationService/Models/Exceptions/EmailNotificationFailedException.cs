namespace EmailNotificationService.Models.Exceptions;

public class EmailNotificationFailedException: Exception
{
    public EmailNotificationFailedException() { }
    public EmailNotificationFailedException(string message):base(message) { }
    public EmailNotificationFailedException(string message, Exception innerException): base(message, innerException) { }
}