using ATKApplication.Enums;
using ATKApplication.Models;

namespace ATKApplication.Contracts.Request
{
    public record UpdateEventRequest(string Name, string Content, DateOnly Date, TimeOnly Time,
        EventType EventType, LevelType LevelType, EventStatus EventStatus,
        Finance? Finance, FeedBack? FeedBack, InterAgencyCooperation? InterAgencyCooperation);
}
