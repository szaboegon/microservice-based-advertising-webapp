using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisementService.BusinessLogic.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public ICollection<Advertisement>? Advertisements { get; set; }
    }
}
