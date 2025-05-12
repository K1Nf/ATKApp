using ATKApplication.Enums;
using ATKApplication.Models;

namespace ATKApplication.Contracts.Response
{
    public class ShortEventResponse
    {
        public Guid Id { get; init; }
        public string ThemeCode { get; init; }
        public string Name { get; init; }
        public string Actor { get; init; }
        public string[]? Links { get; init; }
        public DateOnly? Date { get; init; }
        //public string IsValuable { get; init; }
        //public string IsBestPractice { get; init; }

        public bool IsSystematic { get; set; }
        public bool IsValuable { get; set; }
        public bool IsBestPractice { get; set; }
        public EventType EventType { get; set; }
        public LevelType LevelType { get; set; }
        public string OrganizerName { get; init; }
        public int? ParticipantsCount { get; init; }
    }
}
