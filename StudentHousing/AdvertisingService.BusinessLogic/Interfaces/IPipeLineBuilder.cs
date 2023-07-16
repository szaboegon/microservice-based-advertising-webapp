using AdvertisingService.BusinessLogic.DataTransferObjects;

namespace AdvertisingService.BusinessLogic.Interfaces
{
    public interface IPipeLineBuilder <T, V>
    {
        public PipeLineBase<T, V> Build(QueryParamsDTO data);
    }
    
}
