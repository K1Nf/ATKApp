using ATKApplication.Enums;
using ATKApplication.Models;

namespace ATKApplication.Contracts.Response
{
    public class ShortEventResponse
    {
        public Guid Id { get; init; }
        public string ThemeCode { get; init; }
        public string Name { get; init; }
        public DateOnly Date { get; init; }
        public EventType Form { get; init; }
        public LevelType Level { get; init; }
        //public EventStatus EventStatus { get; init; }
        public string IsValuable { get; init; }
        public string IsBestPractice { get; init; }
        public string OrganizerName { get; init; }
        public int? ParticipantsCount { get; init; }
    }
}
