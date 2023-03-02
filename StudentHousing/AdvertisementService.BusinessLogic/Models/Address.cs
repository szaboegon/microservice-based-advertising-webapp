namespace AdvertisementService.BusinessLogic.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string? Region { get; set; }
        public string? PostalCode { get; set; }
        public string? City { get; set; }
        public string? District { get; set; }
        public string? Street { get; set; }
        public string? StreetNumber { get; set; }
        public string? UnitNumber { get; set; }

        public Housing? Housing { get; set; }
    }
}
