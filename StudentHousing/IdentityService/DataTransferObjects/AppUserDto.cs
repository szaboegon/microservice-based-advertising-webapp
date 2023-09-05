﻿namespace IdentityService.DataTransferObjects;

public record AppUserDto
{
    public int Id { get; init; }
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
    public string? UserName { get; init; }
    public string? Email { get; init; }
}