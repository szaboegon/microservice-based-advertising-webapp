using AdvertisementService.BusinessLogic.DataTransferObjects;
using AdvertisementService.BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisementService.BusinessLogic.Services
{
    public class AdService
    {
        public static bool CreateNewAdvertisement(NewAdvertisementDTO data)
        {
            if (data == null)
            {
                return false;
            }

            var advertisement = new Advertisement
            {
                NumberOfRooms = data.NumberOfRooms,
                Size = data.Size,
                Furnished = data.Furnished,
                Parking = data.Parking,
                MonthlyPrice =data.Pr
            };
        }
    }
}
