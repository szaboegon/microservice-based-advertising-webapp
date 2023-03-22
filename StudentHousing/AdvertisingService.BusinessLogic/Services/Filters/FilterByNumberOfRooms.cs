using AdvertisingService.BusinessLogic.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.Services.Filters
{
    public class FilterByNumberOfRooms : IFilter<IEnumerable<AdvertisementCardDTO>>
    {
        private readonly float? _numberOfRooms;

        public FilterByNumberOfRooms(float? numberOfRooms)
        {
            _numberOfRooms = numberOfRooms;
        }
        public IEnumerable<AdvertisementCardDTO> Execute(IEnumerable<AdvertisementCardDTO> input)
        {
            return _numberOfRooms == null ? input : input.Where(a => a.NumberOfRooms == _numberOfRooms);
        }
    }
}
