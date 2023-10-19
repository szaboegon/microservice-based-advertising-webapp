namespace MessagingService.Dtos;

public record SendMessageRequestDto
{
    public required string MessageContent { get; init; }
    public required int ReceiverId { get; init; }
    public required int AdvertisementId { get; init; }
}