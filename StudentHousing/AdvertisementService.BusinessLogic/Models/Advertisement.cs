using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisementService.BusinessLogic.Models
{
    public class Advertisement
    {
        public int Id { get; set; }
        public float NumberOfRooms { get; set; }
        public float Size { get; set; }
        public bool Furnished { get; set; }
        public bool Parking { get; set; }
        public double MonthlyPrice { get; set; }
        public DateTime UploadDate { get; set; }
        public string? Description { get; set; }
        public int AdvertiserId { get; set; }
        public int CategoryId { get; set; }
        public int AddressId { get; set; }


        public Category? Category { get; set; }
        public Address? Address { get; set; }

        public ICollection<Image>? Images { get; set; }
    }
}
