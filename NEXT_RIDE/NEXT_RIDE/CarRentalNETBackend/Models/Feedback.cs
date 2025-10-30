using System;
using System.Collections.Generic;

namespace CarRentalNETBackend.Models;

public partial class Feedback
{
    public long FeedbackId { get; set; }

    public string? Comment { get; set; }

    public long UserId { get; set; }

    public virtual User User { get; set; } = null!;
}
