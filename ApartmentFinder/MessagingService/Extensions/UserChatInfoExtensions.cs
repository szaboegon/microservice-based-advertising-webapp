using MessagingService.Dtos;
using MessagingService.Models;

namespace MessagingService.Extensions;

public static class UserChatInfoExtensions
{
    public static UserChatInfoDto ToDto(this UserChatInfo userChat)
    {
        return new UserChatInfoDto()
        {
            AdvertisementId = userChat.AdvertisementId,
            UniqueName = userChat.UniqueName,
            PartnerId = userChat.PartnerId,
            LastMessage = userChat.LastMessage?.ToDto(),
            HasUnreadMessage = userChat.HasUnreadMessage,
        };
    }
}