using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.Helpers;

public sealed class PagedList<T>
{
    public List<T> Items { get; }

    public int CurrentPage { get; }
    public int TotalPages => (int)Math.Ceiling(TotalItemCount / (double)PageItemCount);
    public int PageItemCount { get; }
    public int TotalItemCount { get; }

    public bool HasNextPage => CurrentPage * PageItemCount < TotalItemCount;
    public bool HasPrevPage => CurrentPage > 1;

    public PagedList(IQueryable<T> query, int currentPage, int pageItemCount)
    {
        Items = query.Skip((currentPage - 1) * pageItemCount).Take(pageItemCount).ToList();
        CurrentPage = currentPage;
        PageItemCount = pageItemCount;
        TotalItemCount = query.Count();
    }

}