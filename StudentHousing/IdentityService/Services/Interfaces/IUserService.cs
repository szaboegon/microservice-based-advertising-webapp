using IdentityService.DataTransferObjects;
using IdentityService.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.Services.Interfaces;

public interface IUserService
{
    Task<AuthenticationResponse> LoginAsync(AuthenticationRequest request);
    Task<IdentityResult> RegisterAsync(RegistrationRequest request);
    Task<AppUserDto> GetUserDetailsByIdAsync(int userId);
}