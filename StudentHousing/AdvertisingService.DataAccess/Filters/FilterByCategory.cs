using AdvertisingService.BusinessLogic.Interfaces;
using AdvertisingService.BusinessLogic.Models;

namespace AdvertisingService.DataAccess.Filters;

public class FilterByCategory : IFilter<Advertisement>
{
    private readonly string? _categoryName;
    public FilterByCategory(string? categoryName) 
    { 
        _categoryName = categoryName;
    }
    public IQueryable<Advertisement> Execute(IQueryable<Advertisement> input)
    {
        return _categoryName == null ? input : input.Where(a => (a.Category.Name?? "").ToLower().Trim() == _categoryName.ToLower().Trim());
    }
}