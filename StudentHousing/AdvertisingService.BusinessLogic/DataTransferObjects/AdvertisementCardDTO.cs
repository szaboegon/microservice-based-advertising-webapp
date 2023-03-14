using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.DataTransferObjects
{
    public class AdvertisementCardDTO
    {
        public string? CategoryName { get; set; }
        public int PostalCode { get; set; }
        public string? City { get; set; }
        public string? District { get; set; }
        public string? StreetName { get; set; }
        public string? StreetNumber { get; set; }
        public float NumberOfRooms { get; set; }
        public float Size { get; set; }
        public int MonthlyPrice { get; set; }
        //[JsonConverter(typeof(ByteArrayConverter))]
        //public byte[]? Image { get; set; }
    }
}
