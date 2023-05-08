using MessagingService.Data;
using MessagingService.Models;
using System.Linq.Expressions;

namespace MessagingService.Repositories
{
    public class MessageRepository: IMessageRepository
    {
        private readonly MessageDbContext _dbcontext;
        public MessageRepository(MessageDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task AddAsync(Message message)
        {
            await _dbcontext.Messages.AddAsync(message);
        }

        public async Task AddRangeAsync(IEnumerable<Message> messages)
        {
            await _dbcontext.Messages.AddRangeAsync(messages);
        }

        public async Task<Message?> GetByIdAsync(int id)
        {
            return await _dbcontext.Messages.FindAsync(id);
        }

        public async Task SaveAsync()
        {
            await _dbcontext.SaveChangesAsync();
        }
    }
}
