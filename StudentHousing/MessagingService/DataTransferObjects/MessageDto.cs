namespace MessagingService.DataTransferObjects;

public record MessageDto
{
    public required int Id { get; init; }
    public required int SenderId { get; init; }
    public required string Content { get; init; }
    public required DateTime TimeStamp { get; init; }
    public required int PrivateChatId { get; init; }
}