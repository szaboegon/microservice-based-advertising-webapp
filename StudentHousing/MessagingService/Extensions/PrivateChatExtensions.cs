using MessagingService.DataTransferObjects;
using MessagingService.Models;

namespace MessagingService.Extensions;

public static class PrivateChatExtensions
{
    public static PrivateChatDto ToDto(this PrivateChat privateChat)
    {
        return new PrivateChatDto()
        {
            Id = privateChat.Id,
            User1Id = privateChat.User1Id,
            User2Id = privateChat.User2Id,
            UniqueName = privateChat.UniqueName,
            Messages = privateChat.Messages.Select(m => m.ToDto()).ToList(),
        };
    }
}