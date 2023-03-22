using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.Services.Filters
{
    public interface IFilter<T>
    {
        T Execute(T input);
    }
}
