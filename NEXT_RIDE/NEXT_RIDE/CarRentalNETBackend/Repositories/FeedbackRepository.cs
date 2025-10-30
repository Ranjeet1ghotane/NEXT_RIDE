using CarRentalNETBackend.DTO;
using CarRentalNETBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace CarRentalNETBackend.Repositories
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly CarrentalContext _context;

        public FeedbackRepository(CarrentalContext context)
        {
            _context = context;
        }

        public async Task<long> AddFeedbackAsync(long userId, string comment)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            var feedback = new Feedback
            {
                UserId = userId,
                Comment = comment
            };

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            return feedback.FeedbackId;
        }

        public async Task<List<FeedbackDTO>> GetAllFeedbackAsync()
        {
            return await _context.Feedbacks
                .Include(f => f.User)
                .Select(f => new FeedbackDTO
                {
                    FeedbackId = f.FeedbackId,
                    UserName = f.User.UserName,
                    Comment = f.Comment
                })
                .ToListAsync();
        }
    }

}
