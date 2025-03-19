using ATKApplication.Enums;
using System;
using System.Numerics;

namespace ATKApplication.Models
{
    public class Event
    {
        private Event(string name, string content, DateOnly date, TimeOnly time, Guid organizerId, Guid themeId, Guid planId, EventType eventType, LevelType levelType)
        {
            Name = name;
            Content = content;
            Date = date;
            Time = time;
            OrganizerId = organizerId;
            ThemeId = themeId;
            EventType = eventType;
            LevelType = levelType;
            PlanId = planId;
            status = EventStatus.Planned;
        }

        public Event()
        {
            
        }

        public Guid Id { get; init; }
        public string Name { get; set; }
        public string Content { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly Time { get; set; }
        public EventType EventType { get; set; }
        public LevelType LevelType { get; set; }
        private EventStatus status;
        public bool IsEffective { get; set; } = false;
        public bool IsValuable { get; set; }
        public bool IsBestPractice { get; set; } 

        public Organization? Organizer { get; init; }
        public Guid OrganizerId { get; set; }

        public Theme? Theme { get; set; }
        public Guid ThemeId { get; set; }

        public Plan? Plan { get; set; }
        public Guid PlanId { get; set; }

        public Finance? Finance { get; set; }
        public Guid FinanceId { get; set; }

        public Category? Category { get; set; }
        public Guid CategoryId { get; set; }



        public List<FeedBack> FeedBack { get; set; } = [];
        public List<InterAgencyCooperation> InterAgencyCooperations { get; set; } = [];
        
        public List<ReportAndEvent> ReportAndEvents { get; set; } = [];
        public List<MediaLink> MediaLinks { get; set; } = [];

        public EventStatus Status
        {
            get => status;
            set
            {
                if (value == EventStatus.Planned)
                {
                    Console.WriteLine("Изменен статус мероприятия \"" + Name + "\" c \"" + status + "\" на \"" + value + "\"!");
                    status = value;
                    return;
                }

                if (value == EventStatus.Completed)
                {
                    // проверка на дату и время перед тем как ставить статус 
                    DateTime storedDateTime = Date.ToDateTime(Time);
                    DateTime now = DateTime.Now;

                    if (now == storedDateTime)
                    {
                        Console.WriteLine("Дата и время совпадают!");
                    }
                    else if (now > storedDateTime)
                    {
                        // мероприятие уже прошло
                        Console.WriteLine("Текущая дата и время позже сохраненных.");
                    }
                    else
                    {
                        // мероприятие еще не прошло
                        Console.WriteLine("Текущая дата и время раньше сохраненных.");
                    }
                }
            }
        }


        public static Event Create(string name, string content, DateOnly date, TimeOnly time, Guid organizerId, Guid themeId, Guid planId, EventType eventType, LevelType levelType)
        {

            Console.WriteLine("Создаем новое мероприятие");
            return new(name, content, date, time, organizerId, themeId, planId, eventType, levelType);
        }


        public bool CalculateIfEffective()
        {
            Console.WriteLine("Происходит расчет эффективности");
            return IsEffective;
        }


        public void GetDetails()
        {
            Console.WriteLine("Подробная информация о мероприятии.");
            Console.WriteLine($"Название: {Name}");
            Console.WriteLine($"Описание: {Content}");
            Console.WriteLine($"Дата и время проведения: {Date} {Time}");
            Console.WriteLine($"Уровень: {LevelType}");
            Console.WriteLine($"Тип: {EventType}");
            Console.WriteLine($"Статус: {Status}");
            
            Console.WriteLine("Участники:");


            //var participants = CategoryAndEvents
            //    .Select(x => new
            //    {
            //        CategoryName = x.Category!.Name,
            //        //Number = x.Count
            //    })
            //    .ToList();

            //participants.ForEach(x => Console.WriteLine("  -" + x.CategoryName + ": " + x.Number));
            //Console.WriteLine("  -Всего: " + participants.Sum(x => x.Number));
            
            Console.WriteLine();
            Console.WriteLine("Входит в план: \"" + Plan!.Name + "\" за " + Plan.Year + "г. для " + Organizer!.Name);

        }
    }
}
