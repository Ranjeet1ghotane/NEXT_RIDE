using System;
using System.Collections.Generic;

namespace CarRentalNETBackend.Models;

public partial class Category
{
    public long Id { get; set; }

    public byte[]? Image { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
}
