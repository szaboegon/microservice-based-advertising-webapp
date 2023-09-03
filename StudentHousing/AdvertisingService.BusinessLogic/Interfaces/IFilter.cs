namespace AdvertisingService.BusinessLogic.Interfaces;

public interface IFilter<T>
{
    IQueryable<T> Execute(IQueryable<T> input);
}