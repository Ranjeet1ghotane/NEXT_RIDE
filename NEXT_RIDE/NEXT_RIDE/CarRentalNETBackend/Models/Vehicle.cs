using System;
using System.Collections.Generic;

namespace CarRentalNETBackend.Models;

public partial class Vehicle
{
    public long VehicleId { get; set; }

    public string? Description { get; set; }

    public double Price { get; set; }

    public byte[]? ProductImage { get; set; }

    public double Quantity { get; set; }

    public string? VehicleName { get; set; }

    public long? CategoryId { get; set; }

    public virtual Category? Category { get; set; }

    public virtual ICollection<Rental> Rentals { get; set; } = new List<Rental>();
}
