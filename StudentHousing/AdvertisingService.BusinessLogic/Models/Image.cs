namespace AdvertisingService.BusinessLogic.Models;

public class Image
{
    public int Id { get; set; }
    public required byte[] Data{ get; set; }
    public int AdvertisementId { get; set; }

    private Advertisement? _advertisement;

    public Advertisement Advertisement
    {
        set => _advertisement = value;
        get => _advertisement ?? throw new InvalidOperationException("Uninitialized property: " + nameof(Advertisement));
    }
}