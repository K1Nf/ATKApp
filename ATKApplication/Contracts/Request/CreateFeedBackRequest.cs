using ATKApplication.Enums;

namespace ATKApplication.Contracts.Request
{
    public record CreateFeedBackRequest(string? Description, string? FeedBackTypes);
}