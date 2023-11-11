using AdvertisingService.BusinessLogic.Helpers.Interfaces;
using AdvertisingService.BusinessLogic.Models;


namespace AdvertisingService.BusinessLogic.RepositoryInterfaces;

public interface IAdvertisementRepository
{
    Task<Advertisement?> Get(int id);
    Task<AdvertisementDetails?> GetDetails(int id);
    Task Add(Advertisement advertisement);
    void Remove(Advertisement advertisement);
    Task<IEnumerable<AdvertisementInfo>> GetByAdvertiserId(int id);
    Task<IEnumerable<AdvertisementInfo>> GetLatest(int count);
    Task<IPagedList<AdvertisementInfo>> GetByQuery(QueryParamsRequest query);
}