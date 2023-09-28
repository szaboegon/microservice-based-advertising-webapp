using Microsoft.AspNetCore.SignalR;
using MessagingService.Helpers;
using MessagingService.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace MessagingService.Hubs;

public class MessageHub : Hub
{
    private readonly IMessageService _messageService;
    private readonly IIdentityProvider _identityProvider;
    private readonly JwtTokenHelper _jwtTokenHelper;

    public MessageHub(IMessageService messageService, IIdentityProvider identityProvider, JwtTokenHelper jwtTokenHelper)
    {
        _messageService = messageService;
        _identityProvider = identityProvider;
        _jwtTokenHelper = jwtTokenHelper;
    }
    public override Task OnConnectedAsync()
    {
        return base.OnConnectedAsync(); //TODO check auth
    }

    public async Task SendMessage(string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", message);
    }

    public async Task SendMessageToGroup(string uniqueName, string messageContent)
    {
        try
        {
            var tokenString = Context.GetHttpContext()?.Request.Query["access_token"].ToString().Replace("Bearer ", "");
            //var tokenString = Context.GetHttpContext()?.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var senderId = _jwtTokenHelper.GetUserIdFromToken(tokenString);

            var message = await _messageService.SendMessageToPrivateChatAsync(senderId, uniqueName, messageContent);
            await Clients.Group(uniqueName).SendAsync("ReceiveMessage", message);
        }
        catch (SecurityTokenException)
        {
            Context.Abort();
            throw;
        }
    }

    public async Task<string> StartPrivateChat(int user2Id)
    {
        try
        {
            var tokenString = Context.GetHttpContext()?.Request.Query["access_token"].ToString().Replace("Bearer ", "");
            //var tokenString = Context.GetHttpContext()?.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var user1Id = _jwtTokenHelper.GetUserIdFromToken(tokenString);

            var privateChat = await _messageService.CreatePrivateChatIfDoesNotExistAsync(user1Id, user2Id);
            await Groups.AddToGroupAsync(Context.ConnectionId, privateChat.UniqueName);
            return privateChat.UniqueName;
        }
        catch (SecurityTokenException)
        {
            Context.Abort();
            throw;
        }
    }
}