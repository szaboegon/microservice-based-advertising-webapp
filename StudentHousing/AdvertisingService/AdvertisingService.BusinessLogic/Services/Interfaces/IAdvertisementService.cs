using AdvertisingService.BusinessLogic.Dtos;
using AdvertisingService.BusinessLogic.Helpers.Interfaces;
using AdvertisingService.BusinessLogic.Models;

namespace AdvertisingService.BusinessLogic.Services.Interfaces;

public interface IAdvertisementService
{
    Task<Advertisement> CreateAdvertisementAsync(AdvertisementCreateDto data, int advertiserId);
    Task<IPagedList<Advertisement>> GetAdvertisementsByQueryAsync(QueryParamsRequestDto queryParams);
    Task<Advertisement?> GetAdvertisementDetailsAsync(int id);
    Task<Advertisement?> DeleteAdvertisementAsync(int advertisementId, int advertiserId);
    Task<IEnumerable<Advertisement>> GetAdvertisementsByUserAsync(int advertiserId);
    Task<IEnumerable<Advertisement>> GetLatestAdvertisementsAsync(int count);
}