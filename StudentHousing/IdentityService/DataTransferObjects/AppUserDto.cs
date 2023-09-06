namespace IdentityService.DataTransferObjects;

public record AppUserDto
{
    public int Id { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public string? UserName { get; init; }
    public string? Email { get; init; }
}