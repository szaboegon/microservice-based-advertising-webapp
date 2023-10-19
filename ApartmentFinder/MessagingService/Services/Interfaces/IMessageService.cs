using MessagingService.Dtos;
using MessagingService.Models;

namespace MessagingService.Services.Interfaces;

public interface IMessageService
{
    Task<Message> SendMessageToPrivateChatAsync(int senderId, string uniqueName, string messageContent);
    Task<PrivateChat> CreatePrivateChatIfDoesNotExistAsync(int user1Id, int user2Id, int advertisementId);
    Task<IEnumerable<PrivateChat>> GetUserChatsAsync(int userId);
    Task<List<int>> GetChatPartnerIdsForUserAsync(int userId);
    Task<IEnumerable<Message>> GetMessagesForPrivateChatAsync(string uniqueName);
    Task<int?> MarkMessagesAsReadAsync(string privateChatUniqueName, int userId);
    Task<int> GetUnreadMessageCountAsync(int userId);
}