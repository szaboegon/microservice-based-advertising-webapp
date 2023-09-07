using MessagingService.DataTransferObjects;

namespace MessagingService.Services.Interfaces;

public interface IUserDataProvider
{
    Task<UserDetailsDto?> GetUserDataByIdAsync(int userId);
}