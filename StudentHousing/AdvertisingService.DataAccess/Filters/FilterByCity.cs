using AdvertisingService.BusinessLogic.Interfaces;
using AdvertisingService.BusinessLogic.Models;

namespace AdvertisingService.DataAccess.Filters
{
    public class FilterByCity : IFilter<Advertisement>
    {
        private readonly string? _city;
        public FilterByCity(string? city)
        {
            _city = city;
        }
        public IQueryable<Advertisement> Execute(IQueryable<Advertisement> input)
        {
            return _city == null ? input : input.Where(a => (a.Address.City ?? "").Trim().ToLower().Contains(_city.Trim().ToLower()));
        }
    }
}
