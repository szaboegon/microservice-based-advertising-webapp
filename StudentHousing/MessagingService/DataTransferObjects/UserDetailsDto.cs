﻿namespace MessagingService.DataTransferObjects;

public record UserDetailsDto
{
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required string Email { get; init; }
}