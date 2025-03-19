using ATKApplication.Enums;
using ATKApplication.Models;

namespace ATKApplication.Contracts.Request
{
    public record CreateEventRequest(string? Name, string? Content, string? Date, string? Time,
        string? Form, string? Level, string? ThemeId, bool? IsValuable, bool? IsBestPractice,
        CreateMediaLinkRequest? CreateMediaLinkRequest, CreateEqualToEqualRequest? CreateEqualToEqualRequest,
        CreateFinanceRequest? CreateFinanceRequest, CreateFeedBackRequest? CreateFeedBackRequest,
        CreateParticipantsRequest? CreateParticipantsRequest, CreateInterAgencyCooperationRequest? CreateInterAgencyCooperationRequest);
}
