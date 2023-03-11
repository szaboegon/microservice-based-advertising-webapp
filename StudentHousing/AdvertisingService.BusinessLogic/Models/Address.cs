﻿namespace AdvertisingService.BusinessLogic.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string? Region { get; set; }
        public int PostalCode { get; set; }
        public string? City { get; set; }
        public string? District { get; set; }
        public string? StreetName { get; set; }
        public string? StreetNumber { get; set; }
        public string? UnitNumber { get; set; }

        public Advertisement? Advertisement { get; set; }
    }
}