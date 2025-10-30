using System;
using System.Collections.Generic;

namespace CarRentalNETBackend.Models;

public partial class User
{
    public long Id { get; set; }

    public string? Address { get; set; }

    public string? Contact { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public string? Pincode { get; set; }

    public string? Role { get; set; }

    public string? UserName { get; set; }

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual ICollection<Rental> Rentals { get; set; } = new List<Rental>();
}
