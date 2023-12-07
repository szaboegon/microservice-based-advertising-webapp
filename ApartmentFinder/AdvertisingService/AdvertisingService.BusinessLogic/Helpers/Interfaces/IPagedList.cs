namespace AdvertisingService.BusinessLogic.Helpers.Interfaces;

public interface IPagedList<T>
{
    List<T> Items { get; }
    int CurrentPage { get; }
    int TotalPages { get; }
    int PageItemCount { get; }
    int TotalItemCount { get; }
    bool HasNextPage { get; }
    bool HasPrevPage { get; }
}
