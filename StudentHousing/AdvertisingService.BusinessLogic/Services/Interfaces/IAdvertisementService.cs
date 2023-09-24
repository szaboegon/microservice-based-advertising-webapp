using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Models;

namespace AdvertisingService.BusinessLogic.Services.Interfaces;

public interface IAdvertisementService
{
    Task<Advertisement> CreateAdvertisementAsync(AdvertisementDetailsDto data, int advertiserId);
    Task<PagedQueryResponse<AdvertisementDto>> GetAdvertisementsByQueryAsync(QueryParamsDto queryParams);
    Task<AdvertisementDetailsDto?> GetAdvertisementDetailsAsync(int id);
    Task<Advertisement?> DeleteAdvertisementAsync(int advertisementId, int advertiserId);
    Task<IEnumerable<AdvertisementDto>> GetAdvertisementsByUserAsync(int advertiserId);
    Task<IEnumerable<AdvertisementDto>> GetLatestAdvertisementsAsync(int count);
}