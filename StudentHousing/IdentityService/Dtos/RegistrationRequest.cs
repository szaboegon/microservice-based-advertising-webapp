namespace IdentityService.Dtos;

public record RegistrationRequest
{
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required string Email { get; init; }
    public required string UserName { get; init; }
    public required string Password { get; init; }
    public required string ConfirmPassword { get; init; }
}