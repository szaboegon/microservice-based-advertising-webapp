using MessagingService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;
using MessagingService.Services;

namespace MessagingService.Controllers;

[Route("api/message")]
[ApiController]
public class MessageController : ControllerBase
{
    private readonly MessageService _messageService;
    private readonly JwtSecurityTokenHandler _tokenHandler;
    public MessageController(MessageService messageService)
    {
        _messageService = messageService;
        _tokenHandler = new JwtSecurityTokenHandler();
    }

    [HttpGet]
    [Route("user_chats")]
    public async Task<ActionResult<IEnumerable<PrivateChat>>> GetPrivateChatsByUserAsync() 
    {
           
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var jwtSecurityToken = _tokenHandler.ReadJwtToken(tokenString);
            var userId = jwtSecurityToken.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value;

            var chats = await _messageService.GetPrivateChatsForUserAsync(int.Parse(userId));
            return Ok(chats);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("user_partners")]
    public async Task<ActionResult<List<int>>> GetChatPartnersByUserAsync()
    {
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var jwtSecurityToken = _tokenHandler.ReadJwtToken(tokenString);
            var userId = jwtSecurityToken.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value;

            var partnerIds = await _messageService.GetChatPartnerIdsForUserAsync(int.Parse(userId));
            return Ok(partnerIds);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("messages/{uniqueName}")]
    public async Task<ActionResult<IEnumerable<Message>>> GetMessagesByPrivateChatUniqueNameAsync(string uniqueName)
    {
        try
        {
            var messages = await _messageService.GetMessagesForPrivateChatAsync(uniqueName);
            return Ok(messages);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    [Route("send_message/{receiverId:int}")]
    public async Task<ActionResult> SendMessageToUserAsync(int receiverId, [FromBody]string messageContent)
    {
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var jwtSecurityToken = _tokenHandler.ReadJwtToken(tokenString);
            var senderId = jwtSecurityToken.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value;

            var privateChat =
                await _messageService.CreatePrivateChatIfDoesNotExistAsync(int.Parse(senderId), receiverId);
            await _messageService.SendMessageToPrivateChatAsync(int.Parse(senderId), privateChat.UniqueName,
                messageContent);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}