namespace AdvertisingService.BusinessLogic.DataTransferObjects
{
    public class NewAdvertisementDTO
    {
        public string? Category { get; set; }
        public string? Region { get; set; }
        public string PostalCode { get; set; }
        public string? City { get; set; }
        public string? District { get; set; }
        public string? StreetName { get; set; }
        public string? StreetNumber { get; set; }
        public string? UnitNumber { get; set; }
        public string? NumberOfRooms { get; set; }
        public string? Size { get; set; }
        public string? Furnished { get; set; }
        public string? Parking { get; set; }
        public string? Description { get; set; }
        public string?  MonthlyPrice { get; set; }
    }
}
