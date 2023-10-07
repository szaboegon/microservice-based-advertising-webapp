namespace IdentityService.Dtos;

public record AuthenticationRequestDto
{
    public required string UserName { get; init; }
    public required string Password { get; init; }
}