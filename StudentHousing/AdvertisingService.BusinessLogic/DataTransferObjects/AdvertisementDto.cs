namespace AdvertisingService.BusinessLogic.DataTransferObjects;

public record AdvertisementDto
{
    public required int Id { get; init; }
    public required string CategoryName { get; init; }
    public required string City { get; init; }
    public string? District { get; init; }
    public required string StreetName { get; init; }
    public required string StreetNumber { get; init; }
    public required float NumberOfRooms { get; init; }
    public required float Size { get; init; }
    public required int MonthlyPrice { get; init; }
    public required  DateTime UploadDate { get; init; }
    public required byte[] Image { get; init; }
}

public record AdvertisementDetailsDto
{
    public required int Id { get; init; }
    public required string CategoryName { get; init; }
    public required string Region { get; init; }
    public required int PostalCode { get; init; }
    public required string City { get; init; }
    public string? District { get; init; }
    public required string StreetName { get; init; }
    public required string StreetNumber { get; init; }
    public string? UnitNumber { get; init; }
    public required float NumberOfRooms { get; init; }
    public required float Size { get; init; }
    public required bool Furnished { get; init; }
    public required bool Parking { get; init; }
    public required string Description { get; init; }
    public required int MonthlyPrice { get; init; }
    public required byte[] Image { get; init; }
    public required int AdvertiserId { get; init; }
}