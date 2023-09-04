namespace AdvertisingService.BusinessLogic.DataTransferObjects;

public record QueryParamsDto
{
    public string? CategoryName { get; init; }
    public string? City { get; init; }
    public float? NumberOfRooms { get; init; }
    public float? MinSize { get; init; }
    public float? MaxSize { get; init; }
    public int? MinMonthlyPrice { get; init; }
    public int? MaxMonthlyPrice { get; init; }
    public bool? Furnished { get; init; }
    public bool? Parking { get; init; }

}