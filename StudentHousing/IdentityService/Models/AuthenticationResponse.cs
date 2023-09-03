using Microsoft.AspNetCore.Identity;

namespace IdentityService.Models;

public class AuthenticationResponse
{
    public SignInResult? SignInResult { get; set; }
    public string? Message { get; set; }
    public string? UserName { get; set; }
    public string? Token { get; set; }
}