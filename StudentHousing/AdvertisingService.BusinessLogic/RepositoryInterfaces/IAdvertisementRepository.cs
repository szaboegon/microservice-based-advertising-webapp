using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Helpers;
using AdvertisingService.BusinessLogic.Models;


namespace AdvertisingService.BusinessLogic.RepositoryInterfaces;

public interface IAdvertisementRepository
{
    Task<Advertisement?> Get(int id);
    Task<IEnumerable<Advertisement>> GetAll();
    Task Add(Advertisement advertisement);
    void Remove(Advertisement advertisement);
    Task<IEnumerable<Advertisement>> GetByAdvertiserId(int id);
    Task<IEnumerable<Advertisement>> GetLatest(int count);
    Task<PagedList<Advertisement>> GetByQuery(QueryParamsDto query);
}