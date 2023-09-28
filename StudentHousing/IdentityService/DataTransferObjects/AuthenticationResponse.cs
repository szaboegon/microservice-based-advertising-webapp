using Microsoft.AspNetCore.Identity;

namespace IdentityService.DataTransferObjects;

public record AuthenticationResponse
{
    public required SignInResult SignInResult { get; init; }
    public required string Message { get; init; }
    public string? UserName { get; init; }
    public string? AccessToken { get; init; }
    public string? RefreshToken { get; init; }
}