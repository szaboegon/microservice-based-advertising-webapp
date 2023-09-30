using MessagingService.Models;

namespace MessagingService.Repositories.Interfaces;

public interface IMessageRepository
{
    Task Add(Message message);
    Task<IEnumerable<Message>> GetByPrivateChat(string uniqueName);
    Task<int> UpdateRange(IEnumerable<Message> messagesToUpdate);
}