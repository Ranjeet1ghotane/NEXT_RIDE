using CarRentalNETBackend.DTO;
using CarRentalNETBackend.Repositories;

namespace CarRentalNETBackend.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IFeedbackRepository _repository;

        public FeedbackService(IFeedbackRepository repository)
        {
            _repository = repository;
        }

        public async Task<long> AddFeedbackAsync(long userId, string comment)
        {
            return await _repository.AddFeedbackAsync(userId, comment);
        }

        public async Task<List<FeedbackDTO>> GetAllFeedbackAsync()
        {
            return await _repository.GetAllFeedbackAsync();
        }
    }

}
