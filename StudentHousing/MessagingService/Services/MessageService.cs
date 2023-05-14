using MessagingService.Repositories.Abstraction;
using MessagingService.Repositories;
using Azure.Messaging;
using MessagingService.Models;

namespace MessagingService.Services
{
    public class MessageService
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IPrivateChatRepository _privateChatRepository;

        public MessageService(IMessageRepository messageRepository, IPrivateChatRepository privateChatRepository)
        {
            _messageRepository = messageRepository;
            _privateChatRepository = privateChatRepository;
        }

        public async Task<Message> SendMessageToPrivateChatAsync(int senderId, string uniqueName, string messageContent)
        {
            var privateChat = await _privateChatRepository.GetByUniqueNameAsync(uniqueName) ?? throw new KeyNotFoundException("Chat does not exist");
            var message = new Message
            {
                SenderId = senderId,
                Content = messageContent,
                PrivateChatId = privateChat.Id,
                PrivateChat = privateChat,
            };

            await _messageRepository.AddAsync(message);
            await _messageRepository.SaveAsync();

            return message;
        }

        public async Task<PrivateChat> CreatePrivateChatIfDoesNotExistAsync(int user1Id, int user2Id)
        {
            var privateChat = await _privateChatRepository.GetUniqueNameByUserIdsAsync(user1Id, user2Id);
            if (privateChat != null) return privateChat;

            privateChat = new PrivateChat
            {
                User1Id = user1Id,
                User2Id = user2Id,
                UniqueName = $"{user1Id}-{user2Id}-{DateTime.UtcNow:yyyy-MM-dd-hh-mm-ss}"
            };

            await _privateChatRepository.AddAsync(privateChat);
            await _privateChatRepository.SaveAsync();

            return privateChat;
        }

        public async Task<IEnumerable<PrivateChat>> GetPrivateChatsForUserAsync(int userId)
        {
            return await _privateChatRepository.GetAllByUserIdAsync(userId);
        }

        public async Task<List<int>> GetChatPartnerIdsForUserAsync(int userId)
        {
            return await _privateChatRepository.GetAllChatPartnerIdsByUserIdAsync(userId);
        }

        public async Task<IEnumerable<Message>> GetMessagesForPrivateChatAsync(string uniqueName)
        {
            return await _messageRepository.GetByPrivateChatUniqueNameAsync(uniqueName);
        }
    }
}
