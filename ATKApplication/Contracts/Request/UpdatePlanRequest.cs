using ATKApplication.Enums;
using ATKApplication.Models;

namespace ATKApplication.Contracts.Request
{
    public record UpdatePlanRequest(string Name, PlanStatus PlanStatus);
}
