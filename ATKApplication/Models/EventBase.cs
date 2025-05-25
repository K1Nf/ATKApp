using ATKApplication.Enums;
using System;
using System.Numerics;

namespace ATKApplication.Models
{
    public class EventBase
    {
        public EventBase() {}
        protected EventBase(string? name, string? actor, string? content, DateOnly? date, Guid organizerId, Guid themeId)
        {
            Id = Guid.NewGuid();
            Name = name;
            Actor = actor;
            Content = content;
            Date = date;
            OrganizerId = organizerId;
            ThemeId = themeId;
            CreatedAt = DateTime.UtcNow;
        }


        public Guid Id { get; init; }
        public string? Actor { get; set; }
        public string? Name { get; set; }
        public string? Content { get; set; }
        public DateOnly? Date { get; set; }
        public DateTime CreatedAt { get; set; }
        


        public Organization? Organizer { get; init; }
        public Guid OrganizerId { get; set; }


        public Theme? Theme { get; set; }
        public Guid ThemeId { get; set; }



        public List<Category>? Categories { get; set; }
        public List<MediaLink> MediaLinks { get; set; } = [];



        public static EventBase Create(string? name, string actor, string content, DateOnly? date, Guid organizerId, Guid themeId)
        {
            Console.WriteLine("Создаем новое мероприятие");
            return new(name, actor, content, date, organizerId, themeId);
        }
    }
}
