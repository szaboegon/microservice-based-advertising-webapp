using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using AdvertisingService.DataAccess.Data;
using Microsoft.EntityFrameworkCore;

namespace AdvertisingService.DataAccess.Repositories;

public class CategoryRepository: ICategoryRepository
{
    private readonly AdvertisementDbContext _dbcontext;
    public CategoryRepository(AdvertisementDbContext dbcontext)
    {
        _dbcontext = dbcontext;
    }

    public async Task<Category?> GetByName(string name)
    {
        return await _dbcontext.Categories.Where(c=>(c.Name ?? "").ToLower() == name.ToLower()).FirstOrDefaultAsync();
    }

    public async Task Add(Category category)
    {
        await _dbcontext.Categories.AddAsync(category);
    }
}