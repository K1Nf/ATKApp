using ATKApplication.Enums;

namespace ATKApplication.Models
{
    public class EventForm2 : EventBase
    {
        public EventForm2(string name, string actor, string content, DateOnly date, 
                        Guid organizerId, Guid themeId, string? equalToEqualContent,
                        string result, string decision,
                        EventType eventType, LevelType levelType,
                        bool isValuable, bool isSystematic, bool isBestPractice)
            : base(name, actor, content, date, organizerId, themeId)
        {
            EventType = eventType;
            LevelType = levelType;
            IsValuable = isValuable;
            IsSystematic = isSystematic;
            IsBestPractice = isBestPractice;
            EqualToEqualDescription = equalToEqualContent;
            Result = result;
            Decision = decision;
        }

        public EventForm2() { }

        public EventType EventType { get; set; }
        public LevelType LevelType { get; set; }
        public bool IsSystematic { get; set; }
        public bool IsValuable { get; set; }
        public bool IsBestPractice { get; set; }
        public string? EqualToEqualDescription { get; set; }
        public string? Result { get; set; }
        public string? Decision { get; set; }



        public Finance? Finance { get; set; }
        public FeedBack? FeedBack { get; set; }
        public Support? Support { get; set; }
        public List<InterAgencyCooperation> InterAgencyCooperations { get; set; } = [];
    }
}
