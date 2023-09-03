using AdvertisingService.BusinessLogic.Interfaces;
using AdvertisingService.BusinessLogic.Models;

namespace AdvertisingService.DataAccess.Filters;

public class FilterByNumberOfRooms : IFilter<Advertisement>
{
    private readonly float? _numberOfRooms;

    public FilterByNumberOfRooms(float? numberOfRooms)
    {
        _numberOfRooms = numberOfRooms;
    }
    public IQueryable<Advertisement> Execute(IQueryable<Advertisement> input)
    {
        return _numberOfRooms == null ? input : input.Where(a => a.NumberOfRooms == _numberOfRooms);
    }
}