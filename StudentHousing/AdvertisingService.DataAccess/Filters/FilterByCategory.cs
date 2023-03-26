using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Interfaces;

namespace AdvertisingService.DataAccess.Filters
{
    public class FilterByCategory : IFilter<AdvertisementCardDTO>
    {
        private readonly string? _categoryName;
        public FilterByCategory(string? categoryName) 
        { 
            _categoryName = categoryName;
        }
        public IQueryable<AdvertisementCardDTO> Execute(IQueryable<AdvertisementCardDTO> input)
        {
            return _categoryName == null ? input : input.Where(a => (a.CategoryName?? "").ToLower().Trim() == _categoryName.ToLower().Trim());
        }
    }
}
