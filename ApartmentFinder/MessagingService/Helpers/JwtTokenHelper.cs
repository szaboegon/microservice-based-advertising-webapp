using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace MessagingService.Helpers;

public class JwtTokenHelper
{
    private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler = new();

    public int GetUserIdFromToken(string? tokenString)
    {
        if (string.IsNullOrEmpty(tokenString))
        {
            throw new SecurityTokenException("Request contains no security token.");
        }

        var jwtSecurityToken = _jwtSecurityTokenHandler.ReadJwtToken(tokenString);
        var userId = jwtSecurityToken.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;

        return userId == null
            ? throw new SecurityTokenException("Advertiser id could not be determined from security token.")
            : int.Parse(userId);
    }
}