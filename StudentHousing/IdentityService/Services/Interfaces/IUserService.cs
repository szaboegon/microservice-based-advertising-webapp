using IdentityService.Dtos;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.Services.Interfaces;

public interface IUserService
{
    Task<TokenDto?> LoginAsync(AuthenticationRequest request);
    Task<IdentityResult> RegisterAsync(RegistrationRequest request);
    Task<AppUserDto?> GetUserDetailsByIdAsync(int userId);
    Task<TokenDto> RefreshTokenAsync(TokenDto request);
}