using IdentityService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Extensions;

public static class ModelBuilderExtensions
{
    public static ModelBuilder SeedData(this ModelBuilder modelBuilder)
    {
        var hasher = new PasswordHasher<IdentityUser>();

        modelBuilder.Entity<AppUser>().HasData(
            new AppUser
            {
                Id = 1,
                FirstName = "John",
                LastName = "Doe",
                UserName = "johndoe",
                NormalizedUserName = "JOHNDOE",
                Email = "johndoe@example.com",
                NormalizedEmail = "JOHNDOE@EXAMPLE.COM",
                PasswordHash = hasher.HashPassword(null, "Password1"),
                SecurityStamp = Guid.NewGuid().ToString("D")
            },
            new AppUser
            {
                Id = 2,
                FirstName = "Bob",
                LastName = "Smith",
                UserName = "bobsmith",
                NormalizedUserName = "BOBSMITH",
                Email = "bobsmith@example.com",
                NormalizedEmail = "BOBSMITH@EXAMPLE.COM",
                PasswordHash = hasher.HashPassword(null, "Password1"),
                SecurityStamp = Guid.NewGuid().ToString("D")
            }
      );

        return modelBuilder;
    }
}