using System.Text.Json.Serialization;

namespace AdvertisingService.BusinessLogic.Models;

public class Advertisement
{
    public int Id { get; set; }
    public float NumberOfRooms { get; set; }
    public float Size { get; set; }
    public bool Furnished { get; set; }
    public bool Parking { get; set; }
    public int MonthlyPrice { get; set; }
    public DateTime UploadDate { get; set; }
    public required string Description { get; set; }
    public int AdvertiserId { get; set; }
    public int CategoryId { get; set; }

    private Category? _category;
    [JsonIgnore]
    public Category Category
    {
        set => _category = value;
        get => _category ?? throw new InvalidOperationException("Uninitialized property: " + nameof(Category));
    }

    private Address? _address;
    [JsonIgnore]
    public Address Address
    {
        set => _address = value;
        get => _address ?? throw new InvalidOperationException("Uninitialized property: " + nameof(Address));
    }

    private ICollection<Image>? _images;
    [JsonIgnore]
    public ICollection<Image> Images
    {
        set => _images = value;
        get => _images ?? throw new InvalidOperationException("Uninitialized property: " + nameof(ICollection<Image>));
    }
}

public class AdvertisementInfo
{
    public required int Id { get; set; }
    public required string CategoryName { get; set; }
    public required string City { get; set; }
    public string? District { get; set; }
    public required string StreetName { get; set; }
    public string? StreetNumber { get; set; }
    public required float NumberOfRooms { get; set; }
    public required float Size { get; set; }
    public required int MonthlyPrice { get; set; }
    public required DateTime UploadDate { get; set; }
    public required byte[] Image { get; set; }
}

public class AdvertisementDetails
{
    public required int Id { get; set; }
    public required string CategoryName { get; set; }
    public required string Region { get; set; }
    public required int PostalCode { get; set; }
    public required string City { get; set; }
    public string? District { get; set; }
    public required string StreetName { get; set; }
    public string? StreetNumber { get; set; }
    public string? UnitNumber { get; set; }
    public required float NumberOfRooms { get; set; }
    public required float Size { get; set; }
    public required bool Furnished { get; set; }
    public required bool Parking { get; set; }
    public required string Description { get; set; }
    public required int MonthlyPrice { get; set; }
    public required IEnumerable<byte[]> Images { get; set; }
    public required int AdvertiserId { get; set; }
}