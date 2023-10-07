using MessagingService.Extensions;
using Microsoft.AspNetCore.SignalR;
using MessagingService.Helpers;
using MessagingService.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace MessagingService.Hubs;

public class MessageHub : Hub
{
    private readonly IMessageService _messageService;
    private readonly JwtTokenHelper _jwtTokenHelper;
    private readonly IAuthChecker _authChecker;

    public MessageHub(IMessageService messageService, JwtTokenHelper jwtTokenHelper, IAuthChecker authChecker)
    {
        _messageService = messageService;
        _jwtTokenHelper = jwtTokenHelper;
        _authChecker = authChecker;
    }
    public override async Task OnConnectedAsync()
    {
        var tokenString = Context.GetHttpContext()?.Request.Query["access_token"].ToString().Replace("Bearer ", "");
        var authResult = await _authChecker.CheckTokenValidity(tokenString);
        if (authResult)
        {
            await base.OnConnectedAsync();
        }
        else
        {
            Context.Abort();
        }
    }

    public async Task SendMessageToGroup(string uniqueName, string messageContent)
    {
        try
        {
            var tokenString = Context.GetHttpContext()?.Request.Query["access_token"].ToString().Replace("Bearer ", "");
            var senderId = _jwtTokenHelper.GetUserIdFromToken(tokenString);

            var message = await _messageService.SendMessageToPrivateChatAsync(senderId, uniqueName, messageContent);
            await Clients.Group(uniqueName).SendAsync("ReceiveMessage", message.ToDto());
        }
        catch (SecurityTokenException)
        {
            Context.Abort();
            throw;
        }
    }

    public async Task<string> StartPrivateChat(int user2Id, int advertisementId)
    {
        try
        {
            var tokenString = Context.GetHttpContext()?.Request.Query["access_token"].ToString().Replace("Bearer ", "");
            var user1Id = _jwtTokenHelper.GetUserIdFromToken(tokenString);

            var privateChat = await _messageService.CreatePrivateChatIfDoesNotExistAsync(user1Id, user2Id, advertisementId);
            await Groups.AddToGroupAsync(Context.ConnectionId, privateChat.UniqueName);
            return privateChat.UniqueName;
        }
        catch (SecurityTokenException)
        {
            Context.Abort();
            throw;
        }
    }

    public async Task MarkMessagesAsRead(string privateChatUniqueName)
    {
        var tokenString = Context.GetHttpContext()?.Request.Query["access_token"].ToString().Replace("Bearer ", "");
        var receiverId = _jwtTokenHelper.GetUserIdFromToken(tokenString);

        _ = await _messageService.MarkMessagesAsReadAsync(privateChatUniqueName, receiverId)
            ?? throw new KeyNotFoundException("Private chat with given name does not exist.");

        await Clients.Group(privateChatUniqueName).SendAsync("MessagesRead", receiverId);
    }
}