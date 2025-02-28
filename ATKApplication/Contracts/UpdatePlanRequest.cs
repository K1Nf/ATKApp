using ATKApplication.Enums;
using ATKApplication.Models;

namespace ATKApplication.Contracts
{
    public record UpdatePlanRequest(string Name, PlanStatus PlanStatus);
}
