using EmailNotificationService.DataTransferObjects;

namespace EmailNotificationService.Services.Interfaces;

public interface IUserDetailsProvider
{
    Task<UserDetailsDto?> GetUserDataByIdAsync(int userId);
}