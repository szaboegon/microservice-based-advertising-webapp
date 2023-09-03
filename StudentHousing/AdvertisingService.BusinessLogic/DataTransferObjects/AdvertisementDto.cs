namespace AdvertisingService.BusinessLogic.DataTransferObjects;

public record AdvertisementDto(
    int Id,
    string CategoryName,
    string City,
    string District,
    string StreetName,
    string StreetNumber,
    float NumberOfRooms,
    float Size,
    int MonthlyPrice,
    DateTime UploadDate,
    byte[] Image);

public record AdvertisementDetailsDto(
    int Id,
    string CategoryName,
    string Region,
    string PostalCode,
    string City,
    string District,
    string StreetName,
    string StreetNumber,
    string UnitNumber,)



public class AdvertisementDetailsDTO
{
    public int Id { get; set; }
    public string? CategoryName { get; set; }
    public string? Region { get; set; }
    public int PostalCode { get; set; }
    public string? City { get; set; }
    public string? District { get; set; }
    public string? StreetName { get; set; }
    public string? StreetNumber { get; set; }
    public string? UnitNumber { get; set; }
    public float NumberOfRooms { get; set; }
    public float Size { get; set; }
    public bool Furnished { get; set; }
    public bool Parking { get; set; }
    public string? Description { get; set; }
    public int MonthlyPrice { get; set; }
    public byte[]? Image { get; set; }
    public int AdvertiserId { get; set; }
}