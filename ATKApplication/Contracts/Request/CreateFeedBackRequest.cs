using ATKApplication.Enums;
using System.Runtime.Serialization;

namespace ATKApplication.Contracts.Request
{
    public record CreateFeedBackRequest(string? Description, FeedBackTypes[] FeedBackTypes);
}