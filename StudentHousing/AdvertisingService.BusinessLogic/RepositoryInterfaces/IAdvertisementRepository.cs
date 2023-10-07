using AdvertisingService.BusinessLogic.Dtos;
using AdvertisingService.BusinessLogic.Helpers.Interfaces;
using AdvertisingService.BusinessLogic.Models;


namespace AdvertisingService.BusinessLogic.RepositoryInterfaces;

public interface IAdvertisementRepository
{
    Task<Advertisement?> Get(int id);
    Task Add(Advertisement advertisement);
    void Remove(Advertisement advertisement);
    Task<IEnumerable<Advertisement>> GetByAdvertiserId(int id);
    Task<IEnumerable<Advertisement>> GetLatest(int count);
    Task<IPagedList<Advertisement>> GetByQuery(QueryParamsDto query);
}