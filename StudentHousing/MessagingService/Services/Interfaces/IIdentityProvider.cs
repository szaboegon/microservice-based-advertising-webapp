using MessagingService.DataTransferObjects;

namespace MessagingService.Services.Interfaces;

public interface IIdentityProvider
{
    Task<bool> CheckTokenValidity(string? token);
    Task<UserDetailsDto?> GetUserDataByIdAsync(int userId);
}