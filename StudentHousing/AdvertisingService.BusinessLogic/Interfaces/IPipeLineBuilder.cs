using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdvertisingService.BusinessLogic.DataTransferObjects;

namespace AdvertisingService.BusinessLogic.Interfaces
{
    public interface IPipeLineBuilder <T>
    {
        public PipeLineBase<T> Build(QueryParamsDTO data);
    }
    
}
