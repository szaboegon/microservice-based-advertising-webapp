
using AdvertisingService.BusinessLogic.Converters;
using System.Text.Json.Serialization;

namespace AdvertisingService.BusinessLogic.DataTransferObjects
{
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
        public int  MonthlyPrice { get; set; }
        //[JsonConverter(typeof(ByteArrayConverter))]
        public byte[]? Image { get; set; }
    }
}
