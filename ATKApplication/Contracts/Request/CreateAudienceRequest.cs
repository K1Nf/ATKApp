using ATKApplication.Enums;

namespace ATKApplication.Contracts.Request
{
    public record CreateAudienceRequest(Audiences[] Audiences, string? Descripton);
}