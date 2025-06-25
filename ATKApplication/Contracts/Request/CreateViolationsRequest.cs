using System.Runtime.Serialization;
using ATKApplication.Domain.Enums;

namespace ATKApplication.Contracts.Request
{
    public record CreateViolationsRequest(Dictionary<Violations, ViolationDTO> Violations);

    
}