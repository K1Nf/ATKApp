using ATKApplication.Enums;
using ATKApplication.Models;

namespace ATKApplication.Contracts
{
    public record UpdateReportRequest(string Name, DateOnly Startdate, DateOnly EndDate, ReportStatus Status);
}
