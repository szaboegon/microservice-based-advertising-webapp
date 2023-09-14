using AdvertisingService.BusinessLogic.Helpers.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AdvertisingService.DataAccess.Helpers;

public sealed class PagedList<T> : IPagedList<T>
{
    public List<T> Items { get; }

    public int CurrentPage { get; }
    public int TotalPages => (int)Math.Ceiling(TotalItemCount / (double)PageItemCount);
    public int PageItemCount { get; }
    public int TotalItemCount { get; }

    public bool HasNextPage => CurrentPage * PageItemCount < TotalItemCount;
    public bool HasPrevPage => CurrentPage > 1;

    private PagedList(List<T> items, int currentPage, int pageItemCount, int totalItemCount)
    {
        Items = items;
        CurrentPage = currentPage;
        PageItemCount = pageItemCount;
        TotalItemCount = totalItemCount;
    }

    public static async Task<PagedList<T>> CreateAsync(IQueryable<T> query, int currentPage, int pageItemCount)
    {
        var totalItemCount = query.Count();
        var items = await query.Skip((currentPage - 1) * pageItemCount).Take(pageItemCount).ToListAsync();
        return new PagedList<T>(items, currentPage, pageItemCount, totalItemCount);
    }

}