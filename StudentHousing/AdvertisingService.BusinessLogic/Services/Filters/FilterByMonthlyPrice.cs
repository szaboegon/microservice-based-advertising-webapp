using AdvertisingService.BusinessLogic.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.Services.Filters
{
    public class FilterByMonthlyPrice : IFilter<IEnumerable<AdvertisementCardDTO>>
    {
        private readonly int? _minMonthlyPrice;
        private readonly int? _maxMonthlyPrice;
        public FilterByMonthlyPrice(int? minMonthlyPrice, int? maxMonthlyPrice)
        {
            _minMonthlyPrice = minMonthlyPrice;
            _maxMonthlyPrice = maxMonthlyPrice;
        }
        public IEnumerable<AdvertisementCardDTO> Execute(IEnumerable<AdvertisementCardDTO> input)
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
