using System;
using System.Collections.Generic;

namespace CarRentalNETBackend.Models;

public partial class Rental
{
    public long RentalId { get; set; }

    public DateOnly? EndDate { get; set; }

    public DateOnly? StartDate { get; set; }

    public long UserId { get; set; }

    public long VehicleId { get; set; }

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual User User { get; set; } = null!;

    public virtual Vehicle Vehicle { get; set; } = null!;
}
