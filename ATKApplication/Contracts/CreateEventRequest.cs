using ATKApplication.Enums;
using ATKApplication.Models;

namespace ATKApplication.Contracts
{
    public record CreateEventRequest(string Name, string Content, DateOnly Date, TimeOnly Time, 
        EventType EventType, LevelType LevelType, Guid ThemeId,
        bool IsValuable, bool IsBestPractice,
        CreateMediaLinkRequest CreateMediaLinkRequest, //CreateEqualToEqualRequest CreateEqualToEqualRequest,
        CreateFinanceRequest? CreateFinanceRequest , CreateFeedBackRequest? CreateFeedBackRequest, 
        CreateParticipantsRequest? CreateParticipantsRequest, 
        CreateInterAgencyCooperationRequest? CreateInterAgencyCooperationRequest);
}
