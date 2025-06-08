using ATKApplication.Contracts.Request;
using ATKApplication.Enums;
using ATKApplication.Models;

namespace ATKApplication.Extensions
{
    public record FilterEntity(string? Municipality, string? Organization, string? Level,
                            bool? Important, bool? PeerFormat, bool? BestPractice,
                            bool? Interagency, bool? Feedback, string? Theme,
                            bool? Financing, string? DateFrom, string? DateTo,
                            List<Sort?>? Orders);
    public record Sort(string Key, bool OrderBy);
}
