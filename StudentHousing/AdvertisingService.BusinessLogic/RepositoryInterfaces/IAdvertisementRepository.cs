using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Models;


namespace AdvertisingService.BusinessLogic.RepositoryInterfaces
{
    public interface IAdvertisementRepository : IRepositoryBase<Advertisement>
    {
        Task<IEnumerable<AdvertisementCardDTO>> GetAllWithCardDataAsync();

        IQueryable<Advertisement> GetAllAsIQueryable();

        Task<AdvertisementDetailsDTO?> GetByIdWithDetailsAsync(int id);

        Task<IEnumerable<AdvertisementCardDTO>> GetByAdvertiserIdAsync(int id);

        Task<IEnumerable<AdvertisementCardDTO>> GetLatestAdvertisementsAsync(int count);
    }
}
