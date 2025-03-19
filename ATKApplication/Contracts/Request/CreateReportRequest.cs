using ATKApplication.Enums;
using ATKApplication.Models;

namespace ATKApplication.Contracts.Request
{
    public record CreateReportRequest(string Name, DateOnly Startdate, DateOnly EndDate);
}
