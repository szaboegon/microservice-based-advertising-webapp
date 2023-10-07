namespace AdvertisingService.BusinessLogic.Dtos;

public record PagedQueryResponse<T>(List<T> Items, int CurrentPage, int TotalPages, int PageItemCount, int TotalItemCount);