namespace AdvertisingService.BusinessLogic.Models;

public record AdvertisementCreate
{
    public required string CategoryName { get; init; }
    public required string Region { get; init; }
    public required int PostalCode { get; init; }
    public required string City { get; init; }
    public string? District { get; init; }
    public required string StreetName { get; init; }
    public string? StreetNumber { get; init; }
    public string? UnitNumber { get; init; }
    public required int NumberOfRooms { get; init; }
    public required float Size { get; init; }
    public required bool Furnished { get; init; }
    public required bool Parking { get; init; }
    public required string Description { get; init; }
    public required int MonthlyPrice { get; init; }
}