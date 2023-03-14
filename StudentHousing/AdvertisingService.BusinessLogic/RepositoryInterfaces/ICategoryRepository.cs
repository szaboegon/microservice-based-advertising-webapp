using AdvertisingService.BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.RepositoryInterfaces
{
    public interface ICategoryRepository : IRepositoryBase<Category>
    {
        Task<Category?> FindByNameAsync(string name);
    }
}
