using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Interfaces;
using AdvertisingService.BusinessLogic.Models;

namespace AdvertisingService.DataAccess.Filters
{
    public class FilterBySize : IFilter<Advertisement>
    {
        private readonly float? _minSize;
        private readonly float? _maxSize;
        public FilterBySize(float? minSize, float? maxSize)
        {
            _minSize = minSize;
            _maxSize = maxSize;
        }
        public IQueryable<Advertisement> Execute(IQueryable<Advertisement> input)
        {
            if (_minSize == null && _maxSize == null)
                return input;

            if (_maxSize == null)
            {
                return input.Where(a => a.Size >= _minSize);
            }

            if (_minSize == null)
            {
                return input.Where(a => a.Size <= _maxSize);
            }

            return input.Where(a => a.Size >= _minSize && a.Size <= _maxSize);
        }
    }
}
