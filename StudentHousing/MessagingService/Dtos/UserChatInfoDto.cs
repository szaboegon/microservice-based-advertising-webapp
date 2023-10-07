namespace MessagingService.Dtos;

public class UserChatInfoDto
{
    public required int PartnerId { get; init; }
    public required int AdvertisementId { get; init; }
    public required string UniqueName { get; init; }
    public MessageDto? LastMessage { get; init; }
    public required bool HasUnreadMessage { get; init; }
}