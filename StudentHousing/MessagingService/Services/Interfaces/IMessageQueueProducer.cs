namespace MessagingService.Services.Interfaces;

public interface IMessageQueueProducer
{
    void SendMessage<T>(T message);
}