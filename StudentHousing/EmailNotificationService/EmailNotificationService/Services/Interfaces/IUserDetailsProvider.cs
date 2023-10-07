using EmailNotificationService.Dtos;

namespace EmailNotificationService.Services.Interfaces;

public interface IUserDetailsProvider
{
    Task<UserDetailsDto?> GetUserDataByIdAsync(int userId);
}