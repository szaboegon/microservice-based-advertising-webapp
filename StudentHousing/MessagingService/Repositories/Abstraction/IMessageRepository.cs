using MessagingService.Models;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Repositories
{
    public interface IMessageRepository
    {
        Task AddAsync(Message message);

        Task AddRangeAsync(IEnumerable<Message> messages);

        Task<Message?> GetByIdAsync(int id);

        Task SaveAsync();
 
    }
}
