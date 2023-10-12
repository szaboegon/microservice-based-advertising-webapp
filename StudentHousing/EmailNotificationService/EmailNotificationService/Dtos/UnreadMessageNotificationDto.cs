namespace EmailNotificationService.Dtos;

public record UnreadMessageNotificationDto
{
    public required int UserId { get; init; }
    public required int UnreadMessageCount { get; init; }
}