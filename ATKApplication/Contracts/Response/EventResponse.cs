using ATKApplication.Domain.Enums;
using ATKApplication.Domain.Models;

namespace ATKApplication.Contracts.Response
{
    public class EventResponse
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public string Content { get; init; }
        public string DateTime { get; init; }
        public EventType EventType { get; init; }
        public LevelType LevelType { get; init; }
        public string IsSystematic { get; init; } 
        public string IsValuable { get; init; }
        public string IsBestPractice { get; init; }
        public string Link { get; init; }
        public string EqualToEqual { get; init; }



        public Organization? Organizer { get; init; }
        public Theme? Theme { get; init; }
        public Category? Category { get; init; }
        public Finance? Finance { get; init; }
        public FeedBack? FeedBack { get; init; }
        public Support? Support { get; init; }
        public List<InterAgencyCooperation> InterAgencyCooperations { get; init; }

    }


    public class SortedEventResponse
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public string Content { get; init; }
        public string DateTime { get; init; }
        public EventType EventType { get; init; }
        public LevelType LevelType { get; init; }
        public string IsValuable { get; init; }
        public string IsBestPractice { get; init; }
        public string Link { get; init; }
        public bool HasEqualToEqual { get; init; }
        public bool HasFinance { get; init; }
        public bool HasFeedBack { get; init; }
        public bool HasInterAgencyCoop { get; init; }



        public Organization? Organizer { get; init; }
        public Theme? Theme { get; init; }
        //public Category? Category { get; init; }
        //public Finance? Finance { get; init; }
        //public FeedBack? FeedBack { get; init; }
        //public Support? Support { get; init; }
        //public List<InterAgencyCooperation> InterAgencyCooperations { get; init; }

    }
}
