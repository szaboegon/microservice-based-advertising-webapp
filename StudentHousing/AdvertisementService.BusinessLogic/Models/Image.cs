﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisementService.BusinessLogic.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string? FilePath { get; set; }
        public int HousingId { get; set; }

        public Housing? Housing { get; set; }
    }
}
