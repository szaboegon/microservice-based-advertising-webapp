using MessagingService.Models;
using MessagingService.Repositories.Interfaces;
using MessagingService.Services.Interfaces;

namespace MessagingService.Services;

public class MessageService : IMessageService
{
    private readonly IMessageRepository _messageRepository;
    private readonly IPrivateChatRepository _privateChatRepository;
    private readonly IMessageQueueProducer _messageQueueProducer;

    public MessageService(IMessageRepository messageRepository, IPrivateChatRepository privateChatRepository, IMessageQueueProducer messageQueueProducer)
    {
        _messageRepository = messageRepository;
        _privateChatRepository = privateChatRepository;
        _messageQueueProducer = messageQueueProducer;
    }

    public async Task<Message> SendMessageToPrivateChatAsync(int senderId, string uniqueName, string messageContent)
    {
        var privateChat = await _privateChatRepository.GetByUniqueName(uniqueName) ?? throw new KeyNotFoundException("Chat does not exist.");
        var message = new Message
        {
            SenderId = senderId,
            Content = messageContent,
            PrivateChatId = privateChat.Id,
            PrivateChat = privateChat,
            IsUnread = true,
            TimeStamp = DateTime.UtcNow
        };

        await _messageRepository.Add(message);

        var receiverId = privateChat.User1Id == senderId ? privateChat.User2Id : privateChat.User1Id;
        _messageQueueProducer.SendMessage(receiverId);

        return message;
    }

    public async Task<PrivateChat> CreatePrivateChatIfDoesNotExistAsync(int user1Id, int user2Id, int advertisementId)
    {
        var privateChat = await _privateChatRepository.GetByUserAndAdvertisementIds(user1Id, user2Id, advertisementId);
        if (privateChat != null) return privateChat;

        privateChat = new PrivateChat
        {
            User1Id = user1Id,
            User2Id = user2Id,
            UniqueName = $"{user1Id}-{user2Id}-{advertisementId}-{DateTime.UtcNow:yyyy-MM-dd-hh-mm-ss}",
            AdvertisementId = advertisementId
        };

        await _privateChatRepository.Add(privateChat);

        return privateChat;
    }

    public async Task<IEnumerable<PrivateChat>> GetUserChatsAsync(int userId)
    {
        var privateChats = await _privateChatRepository.GetByUserId(userId);
        return privateChats;
    }

    public async Task<List<int>> GetChatPartnerIdsForUserAsync(int userId)
    {
        return await _privateChatRepository.GetChatPartnerIdsByUserId(userId);
    }

    public async Task<IEnumerable<Message>> GetMessagesForPrivateChatAsync(string uniqueName)
    {
        var messages = await _messageRepository.GetByPrivateChat(uniqueName);
        return messages;
    }

    public async Task<int?> MarkMessagesAsReadAsync(string privateChatUniqueName, int userId)
    {
        var privateChat = await _privateChatRepository.GetByUniqueName(privateChatUniqueName);
        if (privateChat == null)
        {
            return null;
        }

        var messagesToUpdate = privateChat.Messages.Where(m => m.SenderId != userId).ToList();
        messagesToUpdate.ForEach(m => m.IsUnread = false);

        return await _messageRepository.UpdateRange(messagesToUpdate);
    }

    public async Task<int> GetUnreadMessageCountAsync(int userId)
    {
        var unreadCount = await _privateChatRepository.GetUserUnreadMessageCount(userId);
        return unreadCount;
    }
}