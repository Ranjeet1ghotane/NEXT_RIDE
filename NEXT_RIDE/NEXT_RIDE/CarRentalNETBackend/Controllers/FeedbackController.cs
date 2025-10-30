using CarRentalNETBackend.DTO;
using CarRentalNETBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarRentalNETBackend.Controllers
{
    [ApiController]
    [EnableCors("AllowLocalhost3000")]
    [Route("customer")]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [Authorize]
        [HttpPost("addFeedback")]
        public async Task<ActionResult<long>> AddFeedback([FromQuery] long userId, [FromQuery] string comment)
        {
            var feedbackId = await _feedbackService.AddFeedbackAsync(userId, comment);
            return Ok(feedbackId);
        }

        
        [HttpGet("getAllFeedback")]
        public async Task<ActionResult<List<FeedbackDTO>>> GetAllFeedback()
        {
            var feedbacks = await _feedbackService.GetAllFeedbackAsync();
            return Ok(feedbacks);
        }
    }

}
