﻿namespace MessagingService.Models;

public record SendMessageRequest
{
    public required string MessageContent { get; init; }
    public required int ReceiverId { get; init; }
    public required int AdvertisementId { get; init; }
}