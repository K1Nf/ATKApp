using ATKApplication.Enums;
using ATKApplication.Models;

namespace ATKApplication.Contracts.Request
{
    public record UpdateReportRequest(string Name, DateOnly Startdate, DateOnly EndDate, ReportStatus Status);
}
