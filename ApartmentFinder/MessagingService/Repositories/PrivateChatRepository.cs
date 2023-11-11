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

    public async Task<IEnumerable<UserChatInfo>> GetChatInfosByUserId(int userId)
    {
        return await _dbcontext.PrivateChats
            .Where(c => c.User1Id == userId || c.User2Id == userId)
            .Include(p => p.Messages)
            .ThenInclude(m => m.PrivateChat)
            .Select(p => new UserChatInfo()
            {
                AdvertisementId = p.AdvertisementId,
                UniqueName = p.UniqueName,
                PartnerId = userId == p.User1Id ? p.User2Id : p.User1Id,
                LastMessage = p.Messages.OrderByDescending(m => m.TimeStamp).FirstOrDefault(),
                HasUnreadMessage = p.Messages.Any(m => m.SenderId != userId && m.IsUnread),
            })
            .ToListAsync();
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
        var chats = await _dbcontext.PrivateChats.Include(p => p.Messages).Where(c => c.User1Id == userId || c.User2Id == userId).ToListAsync();
        return chats.Sum(c => c.Messages.Count(m => m.IsUnread && m.SenderId != userId));
    }

    public async Task<int[]> GetAllUserIds()
    {
         var arrays = await _dbcontext.PrivateChats.Select(p => new[] { p.User1Id, p.User2Id }).ToArrayAsync();
         return arrays.SelectMany(arr => arr).Distinct().ToArray();
    }

}