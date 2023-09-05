﻿using Microsoft.AspNetCore.Identity;

namespace IdentityService.Models;

public class AppUser : IdentityUser<int>
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}