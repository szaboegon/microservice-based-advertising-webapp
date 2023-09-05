using IdentityService.DataTransferObjects;
using IdentityService.Models;

namespace IdentityService.Extensions;

public static class AppUserExtensions
{
    public static AppUserDto ToDto(this AppUser user)
    {
        return new AppUserDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            UserName = user.UserName,
            Email = user.Email,
        };
    }
}