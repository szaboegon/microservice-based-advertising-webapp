namespace AdvertisingService.BusinessLogic.DataTransferObjects
{
    public class QueryParamsDTO
    {
        public string? CategoryName { get; set; }
        public string? City { get; set; }
        public float? NumberOfRooms { get; set; }
        public float? MinSize { get; set; }
        public float? MaxSize { get; set; }
        public int? MinMonthlyPrice { get; set; }
        public int? MaxMonthlyPrice { get; set ; }
        public bool? Furnished { get; set; }
        public bool? Parking { get; set; }

    }
}
