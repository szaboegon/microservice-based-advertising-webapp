using AdvertisingService.BusinessLogic.DataTransferObjects;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.Services.Filters
{
    public class FilterByFurnished : IFilter<IEnumerable<AdvertisementCardDTO>>
    {
        private readonly bool? _furnished;
        public FilterByFurnished(bool? furnished)
        {
            _furnished = furnished;
        }
        public IEnumerable<AdvertisementCardDTO> Execute(IEnumerable<AdvertisementCardDTO> input)
        {
            return _furnished == null ? input : input.Where(a => a.Furnished == _furnished);
        }
    }
}
