using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Models;


namespace AdvertisingService.BusinessLogic.RepositoryInterfaces;

public interface IAdvertisementRepository : IRepositoryBase<Advertisement>
{
    Task<IEnumerable<AdvertisementDto>> GetAllWithCardDataAsync();

    IQueryable<Advertisement> GetAllAsIQueryable();

    Task<AdvertisementDetailsDto?> GetByIdWithDetailsAsync(int id);

    Task<IEnumerable<AdvertisementDto>> GetByAdvertiserIdAsync(int id);

    Task<IEnumerable<AdvertisementDto>> GetLatestAdvertisementsAsync(int count);
}