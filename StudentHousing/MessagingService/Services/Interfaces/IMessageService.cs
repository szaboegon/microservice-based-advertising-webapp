using MessagingService.DataTransferObjects;
using MessagingService.Models;

namespace MessagingService.Services.Interfaces;

public interface IMessageService
{
    Task<MessageDto> SendMessageToPrivateChatAsync(int senderId, string uniqueName, string messageContent);
    Task<PrivateChat> CreatePrivateChatIfDoesNotExistAsync(int user1Id, int user2Id);
    Task<IEnumerable<PrivateChatDto>> GetPrivateChatsForUserAsync(int userId);
    Task<List<int>> GetChatPartnerIdsForUserAsync(int userId);
    Task<IEnumerable<MessageDto>> GetMessagesForPrivateChatAsync(string uniqueName);
}