using IdentityService.Models;
using System.Security.Claims;

namespace IdentityService.Services.Interfaces;

public interface ITokenProvider
{
    string GenerateAccessToken(AppUser user);
    string GenerateRefreshToken();
    ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
}