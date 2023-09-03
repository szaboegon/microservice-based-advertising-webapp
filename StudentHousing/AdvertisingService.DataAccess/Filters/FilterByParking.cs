using AdvertisingService.BusinessLogic.Interfaces;
using AdvertisingService.BusinessLogic.Models;

namespace AdvertisingService.DataAccess.Filters;

public class FilterByParking : IFilter<Advertisement>
{
    private readonly bool? _parking;

    public FilterByParking(bool? parking)
    {
        _parking = parking;
    }
    public IQueryable<Advertisement> Execute(IQueryable<Advertisement> input)
    {
        return _parking == null ? input : input.Where(a => a.Parking == _parking);
    }
}