using Microsoft.AspNetCore.SignalR;
using System.IdentityModel.Tokens.Jwt;
using MessagingService.Services;

namespace MessagingService.Hubs;

public class MessageHub : Hub
{
    private readonly JwtSecurityTokenHandler _tokenHandler;
    private readonly MessageService _messageService;

    public MessageHub(MessageService messageService)
    {
        _messageService = messageService;
        _tokenHandler = new JwtSecurityTokenHandler();
    }
    public override Task OnConnectedAsync()
    {
        //Context.Abort(); TODO
        return base.OnConnectedAsync();
    }

    public async Task SendMessage(string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", message);
    }

    public async Task SendMessageToGroup(string uniqueName, string messageContent)
    {
        var tokenString = Context.GetHttpContext()?.Request.Query["access_token"].ToString().Replace("Bearer ", "");
        //var tokenString = Context.GetHttpContext()?.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

        var senderId = GetUserIdFromToken(tokenString);

        var message = await _messageService.SendMessageToPrivateChatAsync(senderId, uniqueName, messageContent);
        await Clients.Group(uniqueName).SendAsync("ReceiveMessage", message);
    }

    public async Task<string> StartPrivateChat(int user2Id)
    {
        var tokenString = Context.GetHttpContext()?.Request.Query["access_token"].ToString().Replace("Bearer ", "");
        //var tokenString = Context.GetHttpContext()?.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        var user1Id = GetUserIdFromToken(tokenString);

        var privateChat = await _messageService.CreatePrivateChatIfDoesNotExistAsync(user1Id, user2Id);
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