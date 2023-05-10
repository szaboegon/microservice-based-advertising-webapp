using MessagingService.Data;
using MessagingService.Models;
using MessagingService.Repositories.Abstraction;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Repositories
{
    public class PrivateChatReposiotry : IPrivateChatRepository
    {
        private readonly MessageDbContext _dbcontext;
        public PrivateChatReposiotry(MessageDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task AddAsync(PrivateChat chat)
        {
            await _dbcontext.PrivateChats.AddAsync(chat);
        }

        public async Task<IEnumerable<PrivateChat>> GetAllByUserIdAsync(int userId)
        {
            return await _dbcontext.PrivateChats.Where(c => c.User1Id == userId || c.User2Id == userId).ToListAsync();
        }

        public async Task<PrivateChat?> GetUniqueNameByUserIdsAsync(int user1Id, int user2Id)
        {
            return await _dbcontext.PrivateChats
                .Where(c => (c.User1Id == user1Id && c.User2Id == user2Id) || (c.User1Id == user2Id && c.User2Id == user1Id)).SingleOrDefaultAsync();
        }

        public async Task<PrivateChat?> GetByUniqueNameAsync(string uniqueName)
        {
            return await _dbcontext.PrivateChats.Where(c => c.UniqueName == uniqueName).SingleOrDefaultAsync();
        }

        public void Remove(PrivateChat chat)
        {
            _dbcontext.PrivateChats.Remove(chat);
        }

        public async Task SaveAsync()
        {
            await _dbcontext.SaveChangesAsync();
        }
    }
}
