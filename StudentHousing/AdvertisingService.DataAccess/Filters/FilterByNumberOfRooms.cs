using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Interfaces;

namespace AdvertisingService.DataAccess.Filters
{
    public class FilterByNumberOfRooms : IFilter<AdvertisementCardDTO>
    {
        private readonly float? _numberOfRooms;

        public FilterByNumberOfRooms(float? numberOfRooms)
        {
            _numberOfRooms = numberOfRooms;
        }
        public IQueryable<AdvertisementCardDTO> Execute(IQueryable<AdvertisementCardDTO> input)
        {
            return _numberOfRooms == null ? input : input.Where(a => a.NumberOfRooms == _numberOfRooms);
        }
    }
}
