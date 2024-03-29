﻿using System.Text.Json.Serialization;

namespace AdvertisingService.BusinessLogic.Models;

public class Category
{
    public int Id { get; set; }
    public required string Name { get; set; }

    private ICollection<Advertisement>? _advertisements;
    [JsonIgnore]
    public ICollection<Advertisement> Advertisements
    {
        set => _advertisements = value;
        get => _advertisements ?? throw new InvalidOperationException("Uninitialized property: " + nameof(ICollection<Advertisement>));
    }
}