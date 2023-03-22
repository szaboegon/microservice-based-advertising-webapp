using AdvertisingService.BusinessLogic.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.Services.Filters
{
    public class FilterByCity: IFilter<IEnumerable<AdvertisementCardDTO>>
    {
        private readonly string? _city;
        public FilterByCity(string? city)
        {
            _city = city;
        }
        public IEnumerable<AdvertisementCardDTO> Execute(IEnumerable<AdvertisementCardDTO> input)
        {
            return _city == null ? input : input.Where(a => (a.City ?? "").Trim().ToLower().Contains(_city.Trim().ToLower()));
        }
    }
}
