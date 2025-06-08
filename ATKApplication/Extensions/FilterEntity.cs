using ATKApplication.Contracts.Request;
using ATKApplication.Enums;
using ATKApplication.Models;

namespace ATKApplication.Extensions
{
    public record FilterEntity(Municipalities? Municipality, AllMunicipalityOrganizations? Organization, LevelType? Level,
                            bool? Important, bool? PeerFormat, bool? BestPractice,
                            bool? Interagency, bool? Feedback, string? Theme,
                            bool? Financing, string? DateFrom, string? DateTo,
                            List<Sort?>? Orders);
    public record Sort(string Key, bool OrderBy);
}
