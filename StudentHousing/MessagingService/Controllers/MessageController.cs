using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using MessagingService.DataTransferObjects;
using MessagingService.Helpers;
using MessagingService.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace MessagingService.Controllers;

[Route("api/message")]
[ApiController]

public class MessageController : ControllerBase
{
    private readonly IMessageService _messageService;
    private readonly JwtTokenHelper _jwtTokenHelper;
    public MessageController(IMessageService messageService, JwtTokenHelper jwtTokenHelper)
    {
        _messageService = messageService;
        _jwtTokenHelper = jwtTokenHelper;
    }

    [HttpGet]
    [Route("user_chats")]
    public async Task<ActionResult<IEnumerable<PrivateChatDto>>> GetPrivateChatsByUser() 
    {
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var userId = _jwtTokenHelper.GetUserIdFromToken(tokenString);

            var chats = await _messageService.GetPrivateChatsForUserAsync(userId);
            return Ok(chats);
        }
        catch (SecurityTokenValidationException ex)
        {
            return Unauthorized(ex.Message);
        }
    }

    [HttpGet]
    [Route("user_partners")]
    public async Task<ActionResult<List<int>>> GetChatPartnersByUser()
    {
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var userId = _jwtTokenHelper.GetUserIdFromToken(tokenString);

            var partnerIds = await _messageService.GetChatPartnerIdsForUserAsync(userId);
            return Ok(partnerIds);
        }
        catch (SecurityTokenValidationException ex)
        {
            return Unauthorized(ex.Message);
        }
    }

    [HttpGet]
    [Route("messages/{uniqueName}")]
    public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForPrivateChat(string uniqueName)
    {
        try
        {
            var messages = await _messageService.GetMessagesForPrivateChatAsync(uniqueName);
            return Ok(messages);
        }
        catch (SecurityTokenValidationException ex)
        {
            return Unauthorized(ex.Message);
        }
    }

    [HttpPost]
    [Route("send_message/{receiverId:int}")]
    public async Task<ActionResult> SendMessageToUser(int receiverId, [FromBody]string messageContent)
    {
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var senderId = _jwtTokenHelper.GetUserIdFromToken(tokenString);

            var privateChat =
                await _messageService.CreatePrivateChatIfDoesNotExistAsync(senderId, receiverId);
            var message = await _messageService.SendMessageToPrivateChatAsync(senderId, privateChat.UniqueName,
                messageContent);
            return CreatedAtAction(nameof(GetMessagesForPrivateChat), privateChat.UniqueName, message);
        }
        catch (SecurityTokenValidationException ex)
        {
            return Unauthorized(ex.Message);
        }
    }
}