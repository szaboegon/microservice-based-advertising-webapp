namespace MessagingService.DataTransferObjects;

public record PrivateChatDto
{
    public required int Id { get; init; }
    public required string UniqueName { get; init; }
    public required int User1Id { get; init; }
    public required int User2Id { get; init; }
    public required int AdvertisementId { get; init; }
    public required ICollection<MessageDto> Messages { get; init; }
}