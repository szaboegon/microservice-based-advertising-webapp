using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdvertisingService.BusinessLogic.Services.Filters;

namespace AdvertisingService.BusinessLogic.Services.PipeLine
{
    public abstract class PipeLineBase<T>
    {
        protected readonly List<IFilter<T>> operations = new List<IFilter<T>>();

        public PipeLineBase<T> Register(IFilter<T> operation)
        {
            operations.Add(operation);

            return this;
        }

        public abstract T PerformOperation(T input);
    }
}
