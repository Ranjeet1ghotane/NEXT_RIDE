using System;
using System.Collections.Generic;

namespace CarRentalNETBackend.Models;

public partial class Payment
{
    public long Id { get; set; }

    public double? Amount { get; set; }

    public DateOnly? PaymentDate { get; set; }

    public long RentalId { get; set; }

    public virtual Rental Rental { get; set; } = null!;
}
