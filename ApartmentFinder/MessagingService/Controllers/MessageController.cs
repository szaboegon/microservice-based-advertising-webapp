using MessagingService.Dtos;
using MessagingService.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using MessagingService.Helpers;
using MessagingService.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using MessagingService.Models;

namespace MessagingService.Controllers;

[Route("api/message")]
[ApiController]

public class MessageController : ControllerBase
{
    private readonly IMessageService _messageService;
    private readonly JwtTokenHelper _jwtTokenHelper;

    private readonly ILogger<MessageController> _logger;
    public MessageController(IMessageService messageService, JwtTokenHelper jwtTokenHelper, ILogger<MessageController> logger)
    {
        _messageService = messageService;
        _jwtTokenHelper = jwtTokenHelper;
        _logger = logger;
    }

    [HttpGet]
    [Route("user_chats")]
    public async Task<ActionResult<IEnumerable<UserChatInfoDto>>> GetPrivateChatsByUser() 
    {
        _logger.LogInformation("Getting private chats by user");
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var userId = _jwtTokenHelper.GetUserIdFromToken(tokenString);

            var chats = await _messageService.GetUserChatsAsync(userId);
            return Ok(chats.Select(c => c.ToDto()));
        }
        catch (SecurityTokenException ex)
        {
            _logger.LogWarning("A security token exception occurred while getting private chats: {Exception}", ex);
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("messages/{uniqueName}")]
    public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForPrivateChat(string uniqueName)
    {
        _logger.LogInformation("Getting messages for private chat, unique name: {PrivateChatUniqueName}", uniqueName);
        var messages = await _messageService.GetMessagesForPrivateChatAsync(uniqueName);
        return Ok(messages.Select(m => m.ToDto()));
    }

    [HttpPost]
    [Route("send_message")]
    public async Task<ActionResult> SendMessageToUser([FromBody]SendMessageRequest messageCreate)
    {
        _logger.LogInformation("Sending message: {Message}", messageCreate);
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var senderId = _jwtTokenHelper.GetUserIdFromToken(tokenString);

            var privateChat =
                await _messageService.CreatePrivateChatIfDoesNotExistAsync(senderId, messageCreate.ReceiverId, messageCreate.AdvertisementId);
            var message = await _messageService.SendMessageToPrivateChatAsync(senderId, privateChat.UniqueName, messageCreate.MessageContent);

            return CreatedAtAction(nameof(GetMessagesForPrivateChat), new{ uniqueName = privateChat.UniqueName }, message.ToDto());
        }
        catch (SecurityTokenException ex)
        {
            _logger.LogWarning("A security token exception occurred while sending message: {Exception}", ex);
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("unread_message_count")]
    public async Task<ActionResult<int>> GetUnreadMessageCount()
    {
        _logger.LogInformation("Getting unread message count");
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var userId = _jwtTokenHelper.GetUserIdFromToken(tokenString);
            var count = await _messageService.GetUnreadMessageCountAsync(userId);

            return Ok(count);
        }
        catch (SecurityTokenException ex)
        {
            _logger.LogWarning("A security token exception occurred while getting unread message count: {Exception}", ex);
            return BadRequest(ex.Message);
        }
    }
}