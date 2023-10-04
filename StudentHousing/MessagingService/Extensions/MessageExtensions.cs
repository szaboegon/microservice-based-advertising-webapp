using MessagingService.DataTransferObjects;
using MessagingService.Models;

namespace MessagingService.Extensions;

public static class MessageExtensions
{
    public static MessageDto ToDto(this Message message)
    {
        return new MessageDto()
        {
            Id = message.Id,
            SenderId = message.SenderId,
            Content = message.Content,
            PrivateChatUniqueName = message.PrivateChat.UniqueName,
            TimeStamp = message.TimeStamp,
        };
    }
}