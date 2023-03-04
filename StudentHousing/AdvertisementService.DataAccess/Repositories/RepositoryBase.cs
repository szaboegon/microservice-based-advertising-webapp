using AdvertisementService.BusinessLogic.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisementService.DataAccess.Repositories
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        private readonly AdvertisementDbContext _dbcontext;
        public RepositoryBase(AdvertisementDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public void Add(T entity)
        {
            _dbcontext.Set<T>().Add(entity);
        }

        public void AddRange(IEnumerable<T> entities)
        {
            _dbcontext.Set<T>().AddRange(entities);
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> expression)
        {
            return _dbcontext.Set<T>().Where(expression);
        }

        public IEnumerable<T> FindAll()
        {
            return _dbcontext.Set<T>().ToList();
        }

        public T FindById(int id)
        {
            return _dbcontext.Set<T>().Find(id);
        }

        public void Remove(T entity)
        {
            _dbcontext.Set<T>().Remove(entity);
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            _dbcontext.Set<T>().RemoveRange(entities);
        }
    }
}
