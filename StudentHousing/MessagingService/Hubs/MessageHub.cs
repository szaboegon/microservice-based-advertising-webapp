using MessagingService.Models;
using MessagingService.Repositories;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;

namespace MessagingService.Hubs
{
    public class MessageHub : Hub
    {
        private readonly JwtSecurityTokenHandler _tokenHandler;
        private readonly Dictionary<int, List<string>> _connectedUsers = new();
        private readonly IMessageRepository _messageRepository;
        public MessageHub(IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
            _tokenHandler = new JwtSecurityTokenHandler();
        }

        public override Task OnConnectedAsync()
        {
            var connectionId = Context.ConnectionId;
            var tokenString = Context.GetHttpContext()?.Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var jwtSecurityToken = _tokenHandler.ReadJwtToken(tokenString);

            if (jwtSecurityToken == null)
            {
                throw new Exception("bajvan");
            }

            var userId = int.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value);

            lock (_connectedUsers)
            {
                if (!_connectedUsers.ContainsKey(userId))
                    _connectedUsers[userId] = new();
                _connectedUsers[userId].Add(connectionId);
            }

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? ex)
        {
            var connectionId = Context.ConnectionId;
            var tokenString = Context.GetHttpContext()?.Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var jwtSecurityToken = _tokenHandler.ReadJwtToken(tokenString);

            if (jwtSecurityToken == null)
            {
                throw new Exception("bajvan2");
            }

            var userId = int.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value);

            lock (_connectedUsers)
            {
                if (_connectedUsers.ContainsKey(userId))
                {
                    _connectedUsers[userId].Remove(connectionId);
                    if (_connectedUsers[userId].Count == 0)
                        _connectedUsers.Remove(userId);
                }
            }

            return base.OnDisconnectedAsync(ex);
        }

        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }

        public async Task SendMessageToUser(int receiverId, string messageContent)
        {
            var connectionId = Context.ConnectionId;
            var tokenString = Context.GetHttpContext()?.Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var jwtSecurityToken = _tokenHandler.ReadJwtToken(tokenString);

            if (jwtSecurityToken == null)
            {
                throw new Exception("bajvan2");
            }

            var senderId = int.Parse(jwtSecurityToken.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value);


            List<string> connections = new();
            if (_connectedUsers.TryGetValue(receiverId, out connections))
            {
                await Clients.Clients(connections).SendAsync("ReceiveMessage", messageContent);
            }

            var message = new Message
            {
                ReceiverId = receiverId,
                SenderId = senderId,
                Content = messageContent
            };

            await _messageRepository.AddAsync(message);
            await _messageRepository.SaveAsync();
        }

        public string GetConnectionId () => Context.ConnectionId;
    }
}
