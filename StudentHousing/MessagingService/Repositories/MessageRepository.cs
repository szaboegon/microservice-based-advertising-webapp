using MessagingService.DAL;
using MessagingService.Models;
using Microsoft.EntityFrameworkCore;
using MessagingService.Repositories.Interfaces;

namespace MessagingService.Repositories;

public class MessageRepository : IMessageRepository
{
    private readonly MessageDbContext _dbcontext;

    public MessageRepository(MessageDbContext dbcontext)
    {
        _dbcontext = dbcontext;
    }

    public async Task Add(Message message)
    {
        await _dbcontext.Messages.AddAsync(message);
        await _dbcontext.SaveChangesAsync();
    }

    public async Task<IEnumerable<Message>> GetByPrivateChat(string privateChatUniqueName)
    {
        return await _dbcontext.Messages.Where(m => m.PrivateChat.UniqueName == privateChatUniqueName).Include(m => m.PrivateChat).ToListAsync();
    }

    public async Task<int> UpdateRange(IEnumerable<Message> messagesToUpdate)
    {
        _dbcontext.Messages.UpdateRange(messagesToUpdate);
        return await _dbcontext.SaveChangesAsync();
    }
}