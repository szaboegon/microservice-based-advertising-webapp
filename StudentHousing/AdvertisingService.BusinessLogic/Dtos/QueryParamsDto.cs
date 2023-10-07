namespace AdvertisingService.BusinessLogic.Dtos;

public record QueryParamsDto
{
    public int CurrentPage { get; init; }
    public int PageItemCount { get; init; }
    public string? CategoryName { get; init; }
    public string? City { get; init; }
    public float? NumberOfRooms { get; init; }
    public float? MinSize { get; init; }
    public float? MaxSize { get; init; }
    public int? MinMonthlyPrice { get; init; }
    public int? MaxMonthlyPrice { get; init; }
    public bool? Furnished { get; init; }
    public bool? Parking { get; init; }
    public string? SortColumn { get; init; }
    public string? SortOrder { get; init; }
}