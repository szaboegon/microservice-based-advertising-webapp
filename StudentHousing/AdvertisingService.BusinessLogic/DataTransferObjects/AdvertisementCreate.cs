using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.DataTransferObjects;

public record AdvertisementCreate
{
    public required string CategoryName { get; init; }
    public required string Region { get; init; }
    public required int PostalCode { get; init; }
    public required string City { get; init; }
    public string? District { get; init; }
    public required string StreetName { get; init; }
    public required string StreetNumber { get; init; }
    public string? UnitNumber { get; init; }
    public required float NumberOfRooms { get; init; }
    public required float Size { get; init; }
    public required bool Furnished { get; init; }
    public required bool Parking { get; init; }
    public required string Description { get; init; }
    public required int MonthlyPrice { get; init; }
}