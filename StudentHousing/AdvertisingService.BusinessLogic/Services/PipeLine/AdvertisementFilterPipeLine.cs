using AdvertisingService.BusinessLogic.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.Services.PipeLine
{
    public class AdvertisementFilterPipeLine : PipeLineBase<IEnumerable<AdvertisementCardDTO>>
    {
        public override IEnumerable<AdvertisementCardDTO> PerformOperation(IEnumerable<AdvertisementCardDTO> input)
        {
            foreach (var operation in operations)
            {
                input = operation.Execute(input);
            }

            return input;
        }
    }
}
