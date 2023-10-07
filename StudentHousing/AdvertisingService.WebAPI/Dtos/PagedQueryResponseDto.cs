namespace AdvertisingService.WebAPI.Dtos;

public record PagedQueryResponseDto<T>(List<T> Items, int CurrentPage, int TotalPages, int PageItemCount, int TotalItemCount);