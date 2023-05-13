using MessagingService.Models;

namespace MessagingService.Repositories.Abstraction
{
    public interface IMessageRepository
    {
        Task AddAsync(Message message);

        Task AddRangeAsync(IEnumerable<Message> messages);

        Task<Message?> GetByIdAsync(int id);

        Task<IEnumerable<Message>> GetByPrivateChatUniqueNameAsync(string uniqueName);

        void Remove(Message message);

        Task SaveAsync();
 
    }
}
