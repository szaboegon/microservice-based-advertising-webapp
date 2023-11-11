using MessagingService.Dtos;

namespace MessagingService.Models;

public class UserChatInfo
{
    public required int PartnerId { get; set; }
    public required int AdvertisementId { get; set; }
    public required string UniqueName { get; set; }
    public Message? LastMessage { get; set; }
    public required bool HasUnreadMessage { get; set; }
}