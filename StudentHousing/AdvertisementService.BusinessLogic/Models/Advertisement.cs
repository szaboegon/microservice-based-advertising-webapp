namespace AdvertisementService.BusinessLogic.Models
{

    public class Advertisement
    {
        public int Id { get; set; }
        public DateTime UploadDate { get; set; }
        public string? Description { get; set; }
        public int AdvertiserId { get; set; }
        public int HousingId { get; set; }

        public Housing? Housing { get; set; }    

    }
}
