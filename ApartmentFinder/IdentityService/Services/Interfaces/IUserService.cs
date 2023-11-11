using IdentityService.Dtos;
using IdentityService.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.Services.Interfaces;

public interface IUserService
{
    Task<TokenExchangeDto?> LoginAsync(AuthenticationRequest request);
    Task<IdentityResult> RegisterAsync(RegistrationRequestDto request);
    Task<AppUser?> GetUserByIdAsync(int userId);
    Task<TokenExchangeDto> RefreshTokenAsync(TokenExchangeDto request);
}