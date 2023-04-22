using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.DataTransferObjects
{
    public class AdvertisementListItemDTO
    {
        public int Id { get; set; }
        public string? CategoryName { get; set; }
        public int PostalCode { get; set; }
        public string? City { get; set; }
        public string? StreetName { get; set; }
        public string? StreetNumber { get; set; }
        public DateTime UploadDate { get; set; }
        public byte[]? Image { get; set; }
    }
}
