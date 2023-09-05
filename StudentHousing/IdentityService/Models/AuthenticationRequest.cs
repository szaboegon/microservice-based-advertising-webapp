namespace IdentityService.Models;

public record AuthenticationRequest
{
    public required string UserName { get; init; }
    public required string Password { get; init; }
}