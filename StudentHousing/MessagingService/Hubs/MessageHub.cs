using MessagingService.Models;
using MessagingService.Repositories;
using MessagingService.Repositories.Abstraction;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;

namespace MessagingService.Hubs
{
    public class MessageHub : Hub
    {
        private readonly JwtSecurityTokenHandler _tokenHandler;
        private readonly IMessageRepository _messageRepository;
        private readonly IPrivateChatRepository _privateChatRepository;

        public MessageHub(IMessageRepository messageRepository, IPrivateChatRepository privateChatRepository)
        {
            _messageRepository = messageRepository;
            _privateChatRepository = privateChatRepository;
            _tokenHandler = new JwtSecurityTokenHandler();
        }

        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }

        public async Task SendMessageToGroup(string uniqueName, string messageContent)
        {
            var tokenString = Context.GetHttpContext()?.Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");

            var senderId = GetUserIdFromToken(tokenString);
            var privateChat = await _privateChatRepository.GetByUniqueNameAsync(uniqueName) ?? throw new Exception("Chat does not exist");
            var message = new Message
            {
                SenderId = senderId,
                Content = messageContent,
                PrivateChatId = privateChat.Id
            };

            await _messageRepository.AddAsync(message);
            await _messageRepository.SaveAsync();

            await Clients.Group(uniqueName).SendAsync("ReceiveMessage", messageContent);
        }

        public async Task<string> StartPrivateChat(int user2Id)
        {
            var tokenString = Context.GetHttpContext()?.Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var user1Id = GetUserIdFromToken(tokenString);

            var privateChat = await _privateChatRepository.GetUniqueNameByUserIdsAsync(user1Id, user2Id);
            if(privateChat == null)
            {
                privateChat = new PrivateChat
                {
                    User1Id = user1Id,
                    User2Id = user2Id,
                    UniqueName = $"{user1Id}-{user2Id}-{DateTime.UtcNow}"
                };

                await _privateChatRepository.AddAsync(privateChat);
                await _privateChatRepository.SaveAsync();
            }
            await Groups.AddToGroupAsync(Context.ConnectionId, privateChat.UniqueName);
            return privateChat.UniqueName;
        }

        private int GetUserIdFromToken(string? tokenString)
        {
            var jwtSecurityToken = _tokenHandler.ReadJwtToken(tokenString) ?? throw new Exception("uh-oh");
            var user1Id = int.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value);

            return user1Id;
        }
    }
}
