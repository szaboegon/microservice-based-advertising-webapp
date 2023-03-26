using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Interfaces;

namespace AdvertisingService.DataAccess.Filters
{
    public class FilterByMonthlyPrice : IFilter<AdvertisementCardDTO>
    {
        private readonly int? _minMonthlyPrice;
        private readonly int? _maxMonthlyPrice;
        public FilterByMonthlyPrice(int? minMonthlyPrice, int? maxMonthlyPrice)
        {
            _minMonthlyPrice = minMonthlyPrice;
            _maxMonthlyPrice = maxMonthlyPrice;
        }
        public IQueryable<AdvertisementCardDTO> Execute(IQueryable<AdvertisementCardDTO> input)
        {
            if (_minMonthlyPrice == null && _maxMonthlyPrice == null)
                return input;

            if(_maxMonthlyPrice == null)
            {
                return input.Where(a => a.MonthlyPrice >= _minMonthlyPrice);
            }

            if (_minMonthlyPrice == null)
            {
                return input.Where(a => a.MonthlyPrice <= _maxMonthlyPrice);
            }

            return input.Where(a => a.MonthlyPrice >= _minMonthlyPrice && a.MonthlyPrice <= _maxMonthlyPrice);
        }
    }
}
