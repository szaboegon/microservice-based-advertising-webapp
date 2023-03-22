using AdvertisingService.BusinessLogic.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.Services.Filters
{
    public class FilterByParking : IFilter<IEnumerable<AdvertisementCardDTO>>
    {
        private readonly bool? _parking;

        public FilterByParking(bool? parking)
        {
            _parking = parking;
        }
        public IEnumerable<AdvertisementCardDTO> Execute(IEnumerable<AdvertisementCardDTO> input)
        {
            return _parking == null ? input : input.Where(a => a.Parking == _parking);
        }
    }
}
