using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using IdentityService.Models;
using IdentityService.Services.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace IdentityService.Services;

public class TokenProvider : ITokenProvider
{
    private readonly TokenOptions _options;
    public TokenProvider(IOptions<TokenOptions> options)
    {
        _options = options.Value;
    }

    public string GenerateAccessToken(AppUser user)
    {
        var claims = new Claim[]
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new("lastName", user.LastName),
            new("firstName", user.FirstName),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new("userName", user.UserName),
        };

        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.AccessTokenSecretKey)), SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _options.AccessTokenIssuer,
            audience: _options.AccessTokenAudience,
            claims: claims,
            expires: DateTime.UtcNow.Add(_options.AccessTokenValidityTimeSpan),
            signingCredentials: signingCredentials
        );

        var tokenValue = new JwtSecurityTokenHandler()
            .WriteToken(token);
        return tokenValue;
    }

    public string GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();

        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

    public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
    {
        var validationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = false,
            ValidateIssuerSigningKey = true,
            ValidIssuer = _options.AccessTokenIssuer,
            ValidAudience = _options.AccessTokenAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.AccessTokenSecretKey)),
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var principal =  tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);
        var jwtToken = (JwtSecurityToken)validatedToken;

        if (jwtToken == null || !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
        {
            throw new SecurityTokenException("Token was invalid.");
        }

        return principal;
    }
}