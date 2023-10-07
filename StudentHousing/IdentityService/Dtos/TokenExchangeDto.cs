namespace IdentityService.Dtos;

public record TokenExchangeDto
{
    public required string AccessToken { get; init; }
    public required string RefreshToken { get; init; }
}