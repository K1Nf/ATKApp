using ATKApplication.Domain.Enums;
using ATKApplication.Domain.Models;
using System.Text.Json.Serialization;

namespace ATKApplication.Contracts.Request
{
    public record AuthorizeRequest(StructuredOrganizations OrganizationName, string Password);
}