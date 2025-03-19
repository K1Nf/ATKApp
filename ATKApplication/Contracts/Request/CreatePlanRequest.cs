using ATKApplication.Enums;
using ATKApplication.Models;

namespace ATKApplication.Contracts.Request
{
    public record CreatePlanRequest(string Name, int Year);
}
