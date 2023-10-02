namespace MessagingService.DataTransferObjects;

public class UserChatInfoDto
{
    public required int PartnerId { get; set; }
    public required int AdvertisementId { get; set; }
    public required string UniqueName { get; set; }
}