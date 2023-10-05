namespace MessagingService.DataTransferObjects;

public record MessageDto
{
    public required int Id { get; init; }
    public required int SenderId { get; init; }
    public required string Content { get; init; }
    public required string TimeStamp { get; init; }
    public required string PrivateChatUniqueName { get; init; }
}