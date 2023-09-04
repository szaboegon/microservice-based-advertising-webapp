using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Interfaces;
using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using AdvertisingService.DataAccess.Filters;

namespace AdvertisingService.DataAccess.PipeLine;

public class AdvertisementFilterPipeLineBuilder : IPipeLineBuilder<Advertisement, AdvertisementCardDTO>
{
    private readonly IAdvertisementRepository _advertisementRepository;
    public AdvertisementFilterPipeLineBuilder(IAdvertisementRepository advertisementRepository)
    {
        _advertisementRepository = advertisementRepository;
    }
    public PipeLineBase<Advertisement, AdvertisementCardDTO> Build(QueryParamsDto data)
    {
        var pipeLine=new AdvertisementFilterPipeLine(_advertisementRepository)
            .Register(new FilterByCategory(data.CategoryName))
            .Register(new FilterByCity(data.City))
            .Register(new FilterByNumberOfRooms(data.NumberOfRooms))
            .Register(new FilterBySize(data.MinSize, data.MaxSize))
            .Register(new FilterByMonthlyPrice(data.MinMonthlyPrice, data.MaxMonthlyPrice))
            .Register(new FilterByFurnished(data.Furnished))
            .Register(new FilterByParking(data.Parking));

        return pipeLine;
    }

}