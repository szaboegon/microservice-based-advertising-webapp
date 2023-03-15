using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;

namespace AdvertisingService.DataAccess.Repositories
{
    public class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
    {
        private readonly AdvertisementDbContext _dbcontext;
        public CategoryRepository(AdvertisementDbContext dbcontext) : base(dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task<Category?> GetByNameAsync(string name)
        {
            return await _dbcontext.Categories.Where(c=>c.Name.ToUpper() == name.ToUpper()).FirstOrDefaultAsync();
        }
    }
}
