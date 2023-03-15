using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Models;


namespace AdvertisingService.BusinessLogic.RepositoryInterfaces
{
    public interface IAdvertisementRepository : IRepositoryBase<Advertisement>
    {
        Task<IEnumerable<AdvertisementCardDTO>> GetAllWithCardDataAsync();

        Task<AdvertisementDetailsDTO?> GetByIdWithDetailsAsync(int id);
    }
}
