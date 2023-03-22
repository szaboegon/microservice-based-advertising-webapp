using AdvertisingService.BusinessLogic.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.Services.Filters
{
    public class FilterByCategory : IFilter<IEnumerable<AdvertisementCardDTO>>
    {
        private readonly string? _categoryName;
        public FilterByCategory(string? categoryName) 
        { 
            _categoryName = categoryName;
        }
        public IEnumerable<AdvertisementCardDTO> Execute(IEnumerable<AdvertisementCardDTO> input)
        {
            return _categoryName == null ? input : input.Where(a => a.CategoryName?.ToLower().Trim() == _categoryName.ToLower().Trim());
        }
    }
}
