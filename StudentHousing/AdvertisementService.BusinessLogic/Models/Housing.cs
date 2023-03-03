using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisementService.BusinessLogic.Models
{
    public class Housing
    {
        public int Id { get; set; }
        public int NumberOfRooms { get; set; }
        public int Size { get; set; }
        public bool Furnished { get; set; }
        public bool ParkingAvailable { get; set; }
        public double MonthlyPrice { get; set; }
        public int CategoryId { get; set; }
        public int AddressId { get; set; }

        public Category? Category { get; set; }
        public Address? Address { get; set; }

        public Advertisement? Advertisement { get; set; }
        public ICollection<Image>? Images { get; set; }
    }
}
