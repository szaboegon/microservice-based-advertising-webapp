using AdvertisingService.BusinessLogic.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.Services.Filters
{
    public class FilterBySize : IFilter<IEnumerable<AdvertisementCardDTO>>
    {
        private readonly float? _minSize;
        private readonly float? _maxSize;
        public FilterBySize(float? minSize, float? maxSize)
        {
            _minSize = minSize;
            _maxSize = maxSize;
        }
        public IEnumerable<AdvertisementCardDTO> Execute(IEnumerable<AdvertisementCardDTO> input)
        {
            if (_minSize == null && _maxSize == null)
                return input;

            if (_maxSize == null)
            {
                return input.Where(a => a.MonthlyPrice >= _minSize);
            }

            if (_minSize == null)
            {
                return input.Where(a => a.MonthlyPrice <= _maxSize);
            }

            return input.Where(a => a.MonthlyPrice >= _minSize && a.MonthlyPrice <= _maxSize);
        }
    }
}
