﻿namespace IdentityService.Models;

public class AuthenticationRequest
{
    public string? UserName { get; set; }
    public string? Password { get; set; }
}