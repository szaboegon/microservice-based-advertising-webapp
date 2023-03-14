using AdvertisingService.BusinessLogic.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.Models
{
    public class Image
    {
        public int Id { get; set; }
        //[JsonConverter(typeof(ByteArrayConverter))]
        public byte[]? Data{ get; set; }
        public int AdvertisementId { get; set; }

        public Advertisement? Advertisement { get; set; }
    }
}
