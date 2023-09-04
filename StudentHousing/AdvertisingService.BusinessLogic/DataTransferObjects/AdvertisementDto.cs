namespace AdvertisingService.BusinessLogic.DataTransferObjects;

public record AdvertisementDto
{
    public int Id { get; init; }
    public string? CategoryName { get; init; }
    public string? City { get; init; }
    public string? District { get; init; }
    public string? StreetName { get; init; }
    public string? StreetNumber { get; init; }
    public float NumberOfRooms { get; init; }
    public float Size { get; init; }
    public int MonthlyPrice { get; init; }
    public DateTime UploadDate { get; init; }
    public byte[]? Image { get; init; }
}

public record AdvertisementDetailsDto
{
    public int Id { get; init; }
    public string? CategoryName { get; init; }
    public string? Region { get; init; }
    public int PostalCode { get; init; }
    public string? City { get; init; }
    public string? District { get; init; }
    public string? StreetName { get; init; }
    public string? StreetNumber { get; init; }
    public string? UnitNumber { get; init; }
    public float NumberOfRooms { get; init; }
    public float Size { get; init; }
    public bool Furnished { get; init; }
    public bool Parking { get; init; }
    public string? Description { get; init; }
    public int MonthlyPrice { get; init; }
    public byte[]? Image { get; init; }
    public int AdvertiserId { get; init; }
}