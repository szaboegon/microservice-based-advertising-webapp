namespace AdvertisingService.BusinessLogic.Models;

public class Address
{
    public int Id { get; set; }
    public required string Region { get; set; }
    public int PostalCode { get; set; }
    public required string City { get; set; }
    public string? District { get; set; }
    public required string StreetName { get; set; }
    public required string StreetNumber { get; set; }
    public string? UnitNumber { get; set; }
    public int AdvertisementId { get; set; }

    private
        Advertisement? _advertisement;
    public Advertisement Advertisement  //https://learn.microsoft.com/en-us/ef/core/miscellaneous/nullable-reference-types
    {
        set  => _advertisement = value;
        get => _advertisement ?? throw new InvalidOperationException("Uninitialized property: " + nameof(Advertisement));
    }

}