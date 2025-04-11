using ATKApplication.Enums;
using System;
using System.Numerics;

namespace ATKApplication.Models
{
    public class Event
    {
        private Event(string name, string content, DateOnly date, Guid organizerId, Guid themeId, EventType eventType, LevelType levelType, string? equalToEqualContent)
        {
            Id = Guid.NewGuid();
            Name = name;
            Content = content;
            Date = date;
            OrganizerId = organizerId;
            ThemeId = themeId;
            EventType = eventType;
            LevelType = levelType;
            EqualToEqualDescription = equalToEqualContent;
            //PlanId = planId;
        }

        public Event()
        {
            
        }

        public Guid Id { get; init; }
        public string Name { get; set; }
        public string Content { get; set; }
        public DateOnly Date { get; set; }
        public EventType EventType { get; set; }
        public LevelType LevelType { get; set; }
        public bool IsSystematic { get; set; } = false;
        public bool IsValuable { get; set; }
        public bool IsBestPractice { get; set; } 
        public string? EqualToEqualDescription { get; set; } 

        public Organization? Organizer { get; init; }
        public Guid OrganizerId { get; set; }

        public Theme? Theme { get; set; }
        public Guid ThemeId { get; set; }

        //public Plan? Plan { get; set; }
        //public Guid? PlanId { get; set; }

        public Finance? Finance { get; set; }
        //public Guid FinanceId { get; set; }

        public Category? Category { get; set; }
        //public Guid CategoryId { get; set; }

        public FeedBack? FeedBack { get; set; }
        //public Guid FeedBackId { get; set; }



        public List<InterAgencyCooperation> InterAgencyCooperations { get; set; } = [];
        public List<ReportAndEvent> ReportAndEvents { get; set; } = [];
        public List<MediaLink> MediaLinks { get; set; } = [];



        public static Event Create(string name, string content, DateOnly date, Guid organizerId, Guid themeId, EventType eventType, LevelType levelType, string? equalToEqualContent)
        {

            Console.WriteLine("Создаем новое мероприятие");
            return new(name, content, date, organizerId, themeId, eventType, levelType, equalToEqualContent);
        }
    }
}
