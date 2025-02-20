using ATKApplication.Enums;
using ATKApplication.Models;

namespace ATKApplication.Contracts
{
    public record CreateEventRequest(string Name, string Content, DateOnly Date, TimeOnly Time, 
        EventType EventType, LevelType LevelType, Guid OrganizerId, Guid ThemeId,
        CreateMediaLinkRequest CreateMediaLinkRequest, //CreateEqualToEqualRequest CreateEqualToEqualRequest,
        CreateFinanceRequest? CreateFinanceRequest , CreateFeedBackRequest? CreateFeedBackRequest, CreateInterAgencyCooperationRequest? CreateInterAgencyCooperationRequest);
}
