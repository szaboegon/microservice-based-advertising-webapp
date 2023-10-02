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
    public async Task<ActionResult<IEnumerable<UserChatInfoDto>>> GetPrivateChatsByUser() 
    {
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var userId = _jwtTokenHelper.GetUserIdFromToken(tokenString);

            var chats = await _messageService.GetUserChatsAsync(userId);
            return Ok(chats);
        }
        catch (SecurityTokenException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    //[HttpGet]
    //[Route("user_partners")]
    //public async Task<ActionResult<List<int>>> GetChatPartnersByUser()
    //{
    //    try
    //    {
    //        var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
    //        var userId = _jwtTokenHelper.GetUserIdFromToken(tokenString);

    //        var partnerIds = await _messageService.GetChatPartnerIdsForUserAsync(userId);
    //        return Ok(partnerIds);
    //    }
    //    catch (SecurityTokenException ex)
    //    {
    //        return BadRequest(ex.Message);
    //    }
    //}

    [HttpGet]
    [Route("messages/{uniqueName}")]
    public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForPrivateChat(string uniqueName)
    {
        var messages = await _messageService.GetMessagesForPrivateChatAsync(uniqueName);
        return Ok(messages);
    }

    [HttpPost]
    [Route("send_message")]
    public async Task<ActionResult> SendMessageToUser([FromBody]SendMessageRequest messageCreate)
    {
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var senderId = _jwtTokenHelper.GetUserIdFromToken(tokenString);

            var privateChat =
                await _messageService.CreatePrivateChatIfDoesNotExistAsync(senderId, messageCreate.ReceiverId, messageCreate.AdvertisementId);
            var message = await _messageService.SendMessageToPrivateChatAsync(senderId, privateChat.UniqueName, messageCreate.MessageContent);

            return CreatedAtAction(nameof(GetMessagesForPrivateChat), new{ uniqueName = privateChat.UniqueName }, message);
        }
        catch (SecurityTokenException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("unread_message_count")]
    public async Task<ActionResult<int>> GetUnreadMessageCount()
    {
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var userId = _jwtTokenHelper.GetUserIdFromToken(tokenString);
            var count = await _messageService.GetUnreadMessageCountAsync(userId);

            return Ok(count);
        }
        catch (SecurityTokenException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}