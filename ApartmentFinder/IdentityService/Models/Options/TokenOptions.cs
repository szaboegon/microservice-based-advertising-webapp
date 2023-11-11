using System.ComponentModel.DataAnnotations;

namespace IdentityService.Models.Options;

public class TokenOptions
{
    public const string ConfigSectionName = "Token";

    [Required]
    public required string AccessTokenIssuer { get; init; }
    [Required]
    public required string AccessTokenAudience { get; init; }
    [Required]
    public required string AccessTokenSecretKey { get; init; }
    [Required]
    public required TimeSpan AccessTokenValidityTimeSpan { get; init; }
    [Required]
    public required TimeSpan RefreshTokenValidityTimeSpan { get; init; }
}