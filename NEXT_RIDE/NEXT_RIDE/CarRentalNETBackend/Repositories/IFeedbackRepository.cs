using CarRentalNETBackend.DTO;

namespace CarRentalNETBackend.Repositories
{
    public interface IFeedbackRepository
    {
        Task<long> AddFeedbackAsync(long userId, string comment);
        Task<List<FeedbackDTO>> GetAllFeedbackAsync();
    }
}
