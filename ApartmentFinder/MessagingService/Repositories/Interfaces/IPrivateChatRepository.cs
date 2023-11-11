using MessagingService.Models;

namespace MessagingService.Repositories.Interfaces;

public interface IPrivateChatRepository
{
    Task Add(PrivateChat chat);
    Task<PrivateChat?> GetByUserAndAdvertisementIds(int user1Id, int user2Id, int advertisementId);
    Task<PrivateChat?> GetByUniqueName(string uniqueName);
    Task<IEnumerable<UserChatInfo>> GetChatInfosByUserId(int userId);
    Task<int> GetUserUnreadMessageCount(int userId);
    Task<int[]> GetAllUserIds();
}