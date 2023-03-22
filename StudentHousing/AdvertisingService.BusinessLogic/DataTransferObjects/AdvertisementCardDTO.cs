using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdvertisingService.BusinessLogic.Models;

namespace AdvertisingService.BusinessLogic.DataTransferObjects
{
    public class AdvertisementCardDTO
    {
        public int Id { get; set; }
        public string? CategoryName { get; set; }
        public int PostalCode { get; set; }
        public string? City { get; set; }
        public string? District { get; set; }
        public string? StreetName { get; set; }
        public string? StreetNumber { get; set; }
        public float NumberOfRooms { get; set; }
        public float Size { get; set; }
        public int MonthlyPrice { get; set; }
        public bool Furnished { get; set; }
        public bool Parking { get; set; }
        public byte[]? Image { get; set; }
    }
}
