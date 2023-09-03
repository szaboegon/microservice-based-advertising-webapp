namespace AdvertisingService.BusinessLogic.DataTransferObjects;

public class AdvertisementCardDTO
{
    public int Id { get; set; }
    public string? CategoryName { get; set; }
    public string? City { get; set; }
    public string? District { get; set; }
    public string? StreetName { get; set; }
    public string? StreetNumber { get; set; }
    public float NumberOfRooms { get; set; }
    public float Size { get; set; }
    public int MonthlyPrice { get; set; }
    public DateTime UploadDate { get; set; }
    public byte[]? Image { get; set; }
}