using ATKApplication.Enums;
using ATKApplication.Models;
using System.Diagnostics.Eventing.Reader;

namespace ATKApplication.Contracts.Request
{
    public record CreateEventRequest(string Name, string Content, string Actor, string Date, string? Time,
        EventType Form, LevelType Level, string ThemeCode, bool IsValuable, bool IsBestPractice,
        CreateMediaLinkRequest? CreateMediaLinkRequest, CreateEqualToEqualRequest? CreateEqualToEqualRequest,
        CreateFinanceRequest? CreateFinanceRequest, CreateFeedBackRequest? CreateFeedBackRequest,
        CreateParticipantsRequest? CreateParticipantsRequest, CreateInterAgencyCooperationRequest? CreateInterAgencyCooperationRequest);
}
