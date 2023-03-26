using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Models;


namespace AdvertisingService.BusinessLogic.RepositoryInterfaces
{
    public interface IAdvertisementRepository : IRepositoryBase<Advertisement>
    {
        Task<IEnumerable<AdvertisementCardDTO>> GetAllWithCardDataAsync();

        IQueryable<AdvertisementCardDTO> GetAllWithCardDataAsIQueryable();

        Task<AdvertisementDetailsDTO?> GetByIdWithDetailsAsync(int id);
    }
}
