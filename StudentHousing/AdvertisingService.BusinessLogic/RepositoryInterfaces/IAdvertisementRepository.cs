using AdvertisingService.BusinessLogic.Models;


namespace AdvertisingService.BusinessLogic.RepositoryInterfaces;

public interface IAdvertisementRepository
{
    Task<Advertisement?> Get(int id);
    Task<IEnumerable<Advertisement>> GetAll();
    Task Add(Advertisement advertisement);
    Task AddRange(IEnumerable<Advertisement> advertisements);
    void Remove(Advertisement advertisement);
    void RemoveRange(IEnumerable<Advertisement> advertisements);
    IQueryable<Advertisement> GetAllAsIQueryable();
    Task<IEnumerable<Advertisement>> GetByAdvertiserId(int id);
    Task<IEnumerable<Advertisement>> GetLatest(int count);
}