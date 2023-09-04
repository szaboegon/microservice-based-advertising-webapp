using AdvertisingService.BusinessLogic.Models;

namespace AdvertisingService.BusinessLogic.RepositoryInterfaces;

public interface ICategoryRepository
{
    Task<Category?> GetByName(string name);
    Task Add(Category category);
}