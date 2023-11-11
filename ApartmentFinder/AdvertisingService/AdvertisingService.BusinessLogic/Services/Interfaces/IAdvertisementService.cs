using AdvertisingService.BusinessLogic.Helpers.Interfaces;
using AdvertisingService.BusinessLogic.Models;

namespace AdvertisingService.BusinessLogic.Services.Interfaces;

public interface IAdvertisementService
{
    Task<Advertisement> CreateAdvertisementAsync(AdvertisementCreate data, int advertiserId);
    Task<IPagedList<AdvertisementInfo>> GetAdvertisementsByQueryAsync(QueryParamsRequest queryParams);
    Task<AdvertisementDetails?> GetAdvertisementDetailsAsync(int id);
    Task<Advertisement?> DeleteAdvertisementAsync(int advertisementId, int advertiserId);
    Task<IEnumerable<AdvertisementInfo>> GetAdvertisementsByUserAsync(int advertiserId);
    Task<IEnumerable<AdvertisementInfo>> GetLatestAdvertisementsAsync(int count);
}