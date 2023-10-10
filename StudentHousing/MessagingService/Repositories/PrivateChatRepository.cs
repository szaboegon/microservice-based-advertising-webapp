using MessagingService.DAL;
using MessagingService.Models;
using MessagingService.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;

namespace MessagingService.Repositories;

public class PrivateChatRepository : IPrivateChatRepository
{
    private readonly MessageDbContext _dbcontext;
    public PrivateChatRepository(MessageDbContext dbcontext)
    {
        _dbcontext = dbcontext;
    }

    public async Task Add(PrivateChat chat)
    {
        await _dbcontext.PrivateChats.AddAsync(chat);
        await _dbcontext.SaveChangesAsync();
    }

    public async Task<IEnumerable<PrivateChat>> GetByUserId(int userId)
    {
        return await _dbcontext.PrivateChats.Include(p => p.Messages).Where(c => c.User1Id == userId || c.User2Id == userId).ToListAsync();
    }

    public async Task<List<int>> GetChatPartnerIdsByUserId(int userId)
    {
        var ids = new List<int>();
        var chats = await _dbcontext.PrivateChats.Where(c => c.User1Id == userId || c.User2Id == userId).ToListAsync();
        foreach (var chat in chats)
        {
            if (chat.User1Id != userId)
            {
                ids.Add(chat.User1Id);
            }
            else if (chat.User2Id != userId)
            {
                ids.Add(chat.User2Id);
            }
        }
        return ids;
    }

    public async Task<PrivateChat?> GetByUserAndAdvertisementIds(int user1Id, int user2Id, int advertisementId)
    {
        return await _dbcontext.PrivateChats
            .Where(c => (c.User1Id == user1Id && c.User2Id == user2Id) || (c.User1Id == user2Id && c.User2Id == user1Id))
            .Where(c => c.AdvertisementId == advertisementId).SingleOrDefaultAsync();
    }

    public async Task<PrivateChat?> GetByUniqueName(string uniqueName)
    {
        return await _dbcontext.PrivateChats.Include(p => p.Messages).Where(c => c.UniqueName == uniqueName).SingleOrDefaultAsync();
    }

    public async Task<int> GetUserUnreadMessageCount(int userId)
    {
        return await _dbcontext.PrivateChats
            .Where(c => c.User1Id == userId || c.User2Id == userId)
            .SumAsync(c => c.Messages.Count(m => m.IsUnread && m.SenderId != userId));
    }
}