﻿using System.Text.Json.Serialization;

namespace AdvertisingService.BusinessLogic.Models;

public class Address
{
    public int Id { get; set; }
    public required string Region { get; set; }
    public int PostalCode { get; set; }
    public required string City { get; set; }
    public string? District { get; set; }
    public required string StreetName { get; set; }
    public string? StreetNumber { get; set; }
    public string? UnitNumber { get; set; }
    public int AdvertisementId { get; set; }

    private Advertisement? _advertisement;
    [JsonIgnore]
    public Advertisement Advertisement  // Avoid nullability of nav property: https://learn.microsoft.com/en-us/ef/core/miscellaneous/nullable-reference-types
    {
        set  => _advertisement = value;
        get => _advertisement ?? throw new InvalidOperationException("Uninitialized property: " + nameof(Advertisement));
    }

}