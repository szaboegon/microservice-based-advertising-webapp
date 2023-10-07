using MessagingService.Dtos;
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
            AdvertisementId = privateChat.AdvertisementId,
            Messages = privateChat.Messages.Select(m => m.ToDto()).ToList(),
        };
    }

    public static UserChatInfoDto ToInfoDto(this PrivateChat privateChat, int userId)
    {
        return new UserChatInfoDto()
        {
            AdvertisementId = privateChat.AdvertisementId,
            UniqueName = privateChat.UniqueName,
            PartnerId = userId == privateChat.User1Id ? privateChat.User2Id : privateChat.User1Id,
            LastMessage = privateChat.Messages.LastOrDefault()?.ToDto(),
            HasUnreadMessage = privateChat.Messages.Any(m => m.SenderId != userId && m.IsUnread),
        };
    }
}