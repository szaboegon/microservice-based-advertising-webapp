using MessagingService.Data;
using MessagingService.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using MessagingService.Repositories.Abstraction;

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

        public async Task<IEnumerable<Message>> GetByPrivateChatUniqueNameAsync(string uniqueName)
        {
            return await _dbcontext.Messages.Where(m => m.PrivateChat.UniqueName == uniqueName).ToListAsync();
        }

        public void Remove(Message message)
        {
            _dbcontext.Messages.Remove(message);
        }

        public async Task SaveAsync()
        {
            await _dbcontext.SaveChangesAsync();
        }
    }
}
