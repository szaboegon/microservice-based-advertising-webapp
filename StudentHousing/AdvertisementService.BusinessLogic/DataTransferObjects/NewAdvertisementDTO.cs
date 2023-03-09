namespace AdvertisementService.BusinessLogic.DataTransferObjects
{
    public class NewAdvertisementDTO
    {
        public string? Category { get; set; }
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
    }
}
