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

    public Category Category
    {
        set => _category = value;
        get => _category ?? throw new InvalidOperationException("Uninitialized property: " + nameof(Category));
    }

    private Address? _address;

    public Address Address
    {
        set => _address = value;
        get => _address ?? throw new InvalidOperationException("Uninitialized property: " + nameof(Address));
    }

    private ICollection<Image>? _images;

    public ICollection<Image> Images
    {
        set => _images = value;
        get => _images ?? throw new InvalidOperationException("Uninitialized property: " + nameof(ICollection<Image>));
    }
}