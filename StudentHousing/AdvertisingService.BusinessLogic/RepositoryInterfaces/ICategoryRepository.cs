using AdvertisingService.BusinessLogic.Models;

namespace AdvertisingService.BusinessLogic.RepositoryInterfaces;

public interface ICategoryRepository : IRepositoryBase<Category>
{
    Task<Category?> GetByNameAsync(string name);
}