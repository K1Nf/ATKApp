using ATKApplication.Domain.Enums;
using ATKApplication.Domain.Models;
using System.Diagnostics.Eventing.Reader;

namespace ATKApplication.Contracts.Request
{
    public record CreateEventForm3Request(string? Name, string? Content, string Actor, 
                                          string? Date, string ThemeCode,
                                          CreateViolationsRequest CreateViolationsRequest);
}
