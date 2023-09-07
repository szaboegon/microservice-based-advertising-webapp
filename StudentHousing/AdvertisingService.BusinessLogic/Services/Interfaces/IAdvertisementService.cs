using AdvertisingService.BusinessLogic.DataTransferObjects;

namespace AdvertisingService.BusinessLogic.Services.Interfaces;

public interface IAdvertisementService
{
    Task<int> CreateNewAdvertisementAsync(AdvertisementDetailsDto data, int advertiserId);
    Task<IEnumerable<AdvertisementDto>> GetAllAdvertisementsAsync(QueryParamsDto queryParams);
    Task<AdvertisementDetailsDto> GetAdvertisementDetailsAsync(int id);
    Task DeleteAdvertisementAsync(int advertisementId, int advertiserId);
    Task<IEnumerable<AdvertisementDto>> GetAdvertisementsByUserAsync(int advertiserId);
    Task<IEnumerable<AdvertisementDto>> GetLatestAdvertisementsAsync(int count);
}