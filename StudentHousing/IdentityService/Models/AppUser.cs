using Microsoft.AspNetCore.Identity;

namespace IdentityService.Models;

public class AppUser : IdentityUser<int>
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
}