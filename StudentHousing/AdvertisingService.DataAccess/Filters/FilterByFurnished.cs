using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Interfaces;

namespace AdvertisingService.DataAccess.Filters
{
    public class FilterByFurnished : IFilter<AdvertisementCardDTO>
    {
        private readonly bool? _furnished;
        public FilterByFurnished(bool? furnished)
        {
            _furnished = furnished;
        }
        public IQueryable<AdvertisementCardDTO> Execute(IQueryable<AdvertisementCardDTO> input)
        {
            return _furnished == null ? input : input.Where(a => a.Furnished == _furnished);
        }
    }
}
