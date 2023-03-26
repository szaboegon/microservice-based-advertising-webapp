using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Interfaces;

namespace AdvertisingService.DataAccess.Filters
{
    public class FilterByCity : IFilter<AdvertisementCardDTO>
    {
        private readonly string? _city;
        public FilterByCity(string? city)
        {
            _city = city;
        }
        public IQueryable<AdvertisementCardDTO> Execute(IQueryable<AdvertisementCardDTO> input)
        {
            return _city == null ? input : input.Where(a => (a.City ?? "").Trim().ToLower().Contains(_city.Trim().ToLower()));
        }
    }
}
