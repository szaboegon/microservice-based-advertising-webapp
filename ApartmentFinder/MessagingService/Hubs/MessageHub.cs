﻿using MessagingService.Extensions;
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

    private readonly ILogger<MessageHub> _logger;

    public MessageHub(IMessageService messageService, JwtTokenHelper jwtTokenHelper, IAuthChecker authChecker, ILogger<MessageHub> logger)
    {
        _messageService = messageService;
        _jwtTokenHelper = jwtTokenHelper;
        _authChecker = authChecker;
        _logger = logger;
    }
    public override async Task OnConnectedAsync()
    {
        var tokenString = Context.GetHttpContext()?.Request.Query["access_token"].ToString().Replace("Bearer ", "");
        var authResult = await _authChecker.CheckTokenValidity(tokenString);
        if (!authResult)
        {
            _logger.LogWarning("Token authentication failed for conn id: {ConnectionId}, aborting connection", Context.ConnectionId);
            Context.Abort();
            return;
        }

        var senderId = _jwtTokenHelper.GetUserIdFromToken(tokenString);
        var chats = await _messageService.GetUserChatsAsync(senderId);
        foreach (var chat in chats)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, chat.UniqueName);
        }

        _logger.LogInformation("User connected with conn id {ConnectionId}:", Context.ConnectionId);
        await base.OnConnectedAsync();
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
        catch (SecurityTokenException ex)
        {
            _logger.LogWarning("Security token exception occurred while sending message, conn id: {ConnectionId}, exception: {Exception}", Context.ConnectionId, ex);
            Context.Abort();
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
        catch (SecurityTokenException ex)
        {
            _logger.LogWarning("Security token exception occurred while sending message, conn id: {ConnectionId}, exception: {Exception}", Context.ConnectionId, ex);
            Context.Abort();
            throw;
        }
    }

    public async Task MarkMessagesAsRead(string privateChatUniqueName)
    {
        var tokenString = Context.GetHttpContext()?.Request.Query["access_token"].ToString().Replace("Bearer ", "");
        var userId = _jwtTokenHelper.GetUserIdFromToken(tokenString);

        _ = await _messageService.MarkMessagesAsReadAsync(privateChatUniqueName, userId)
            ?? throw new KeyNotFoundException("Private chat with given name does not exist.");

        var unreadMessageCount = await _messageService.GetUnreadMessageCountAsync(userId);
        await Clients.Group(privateChatUniqueName).SendAsync("MessagesRead", userId, unreadMessageCount);
    }
}