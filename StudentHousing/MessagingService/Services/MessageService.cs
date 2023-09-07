using MessagingService.DataTransferObjects;
using MessagingService.Extensions;
using MessagingService.Models;
using MessagingService.Repositories.Interfaces;

namespace MessagingService.Services;

public class MessageService
{
    private readonly IMessageRepository _messageRepository;
    private readonly IPrivateChatRepository _privateChatRepository;

    public MessageService(IMessageRepository messageRepository, IPrivateChatRepository privateChatRepository)
    {
        _messageRepository = messageRepository;
        _privateChatRepository = privateChatRepository;
    }

    public async Task<MessageDto> SendMessageToPrivateChatAsync(int senderId, string uniqueName, string messageContent)
    {
        var privateChat = await _privateChatRepository.GetByUniqueName(uniqueName) ?? throw new KeyNotFoundException("Chat does not exist");
        var message = new Message
        {
            SenderId = senderId,
            Content = messageContent,
            PrivateChatId = privateChat.Id,
            PrivateChat = privateChat,
        };

        await _messageRepository.Add(message);

        return message.ToDto();
    }

    public async Task<PrivateChat> CreatePrivateChatIfDoesNotExistAsync(int user1Id, int user2Id)
    {
        var privateChat = await _privateChatRepository.GetByUserIds(user1Id, user2Id);
        if (privateChat != null) return privateChat;

        privateChat = new PrivateChat
        {
            User1Id = user1Id,
            User2Id = user2Id,
            UniqueName = $"{user1Id}-{user2Id}-{DateTime.UtcNow:yyyy-MM-dd-hh-mm-ss}"
        };

        await _privateChatRepository.Add(privateChat);

        return privateChat;
    }

    public async Task<IEnumerable<PrivateChatDto>> GetPrivateChatsForUserAsync(int userId)
    {
        var privateChats = await _privateChatRepository.GetByUserId(userId);
        return privateChats.Select(p => p.ToDto());
    }

    public async Task<List<int>> GetChatPartnerIdsForUserAsync(int userId)
    {
        return await _privateChatRepository.GetChatPartnerIdsByUserId(userId);
    }

    public async Task<IEnumerable<MessageDto>> GetMessagesForPrivateChatAsync(string uniqueName)
    {
        var messages = await _messageRepository.GetByPrivateChat(uniqueName);
        return messages.Select(m => m.ToDto());
    }
}