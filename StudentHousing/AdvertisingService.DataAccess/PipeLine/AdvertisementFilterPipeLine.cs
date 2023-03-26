using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Interfaces;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;

namespace AdvertisingService.DataAccess.PipeLine
{
    public class AdvertisementFilterPipeLine : PipeLineBase<AdvertisementCardDTO>
    {
        private readonly IAdvertisementRepository _advertisementRepository;

        public AdvertisementFilterPipeLine(IAdvertisementRepository advertisementRepository)
        {
            _advertisementRepository = advertisementRepository;

        }
        public override async Task<IEnumerable<AdvertisementCardDTO>> PerformOperation()
        {
            var input = _advertisementRepository.GetAllWithCardDataAsIQueryable();
            foreach (var operation in Operations)
            {
                input = operation.Execute(input);
            }

            return await input.ToListAsync();
        }
    }
}
