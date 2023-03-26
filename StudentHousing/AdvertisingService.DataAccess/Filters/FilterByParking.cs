using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Interfaces;

namespace AdvertisingService.DataAccess.Filters
{
    public class FilterByParking : IFilter<AdvertisementCardDTO>
    {
        private readonly bool? _parking;

        public FilterByParking(bool? parking)
        {
            _parking = parking;
        }
        public IQueryable<AdvertisementCardDTO> Execute(IQueryable<AdvertisementCardDTO> input)
        {
            return _parking == null ? input : input.Where(a => a.Parking == _parking);
        }
    }
}
