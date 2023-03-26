using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace AdvertisingService.DataAccess.Repositories
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class 
    {
        private readonly AdvertisementDbContext _dbcontext;
        public RepositoryBase(AdvertisementDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task AddAsync(T entity)
        {
           await _dbcontext.Set<T>().AddAsync(entity);;
        }

        public async Task AddRangeAsync(IEnumerable<T> entities)
        {
           await _dbcontext.Set<T>().AddRangeAsync(entities);
        }

        public async Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> expression)
        {
            return await _dbcontext.Set<T>().Where(expression).ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await Task.FromResult(_dbcontext.Set<T>().ToList());
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            return await _dbcontext.Set<T>().FindAsync(id);
        }

        public void Remove(T entity)
        {
             _dbcontext.Set<T>().Remove(entity);
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            _dbcontext.Set<T>().RemoveRange(entities);
        }

        public async Task SaveAsync()
        {
            await _dbcontext.SaveChangesAsync();
        }
    }
}
