using Microsoft.AspNetCore.Identity;

namespace IdentityService.Models;

public record AuthenticationResponse
{
    public required SignInResult SignInResult { get; init; }
    public required string Message { get; init; }
    public string? UserName { get; init; }
    public string? Token { get; init; }
}