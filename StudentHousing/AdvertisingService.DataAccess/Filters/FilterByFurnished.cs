using AdvertisingService.BusinessLogic.Interfaces;
using AdvertisingService.BusinessLogic.Models;

namespace AdvertisingService.DataAccess.Filters
{
    public class FilterByFurnished : IFilter<Advertisement>
    {
        private readonly bool? _furnished;
        public FilterByFurnished(bool? furnished)
        {
            _furnished = furnished;
        }
        public IQueryable<Advertisement> Execute(IQueryable<Advertisement> input)
        {
            return _furnished == null ? input : input.Where(a => a.Furnished == _furnished);
        }
    }
}
