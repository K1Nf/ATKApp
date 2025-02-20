using ATKApplication.Enums;

namespace ATKApplication.Models
{
    public class Plan
    {
        private Plan(string name, Guid organizerId, int year) 
        {
            Id = Guid.NewGuid();
            Name = name;
            OrganizationId = organizerId;
            Year = year;
        }
        public Plan()
        {
            
        }

        public Guid Id { get; init; }
        public string Name { get; set; } = null!;
        public PlanStatus Status { get; set; } = PlanStatus.Created;
        public int Year { get; set; }
        public Organization? Organization { get; init; }
        public Guid OrganizationId { get; set; }
        public List<Event> Events { get; set; } = [];



        public static Plan Create(string name, Guid organizerId, int year) 
        {
            //validation
            Plan plan = new (name, organizerId, year);
            Console.WriteLine("Создан план за " + plan.Year + "г.");
            
            return plan;
        }



        public void SendPlan()
        {
            Status = PlanStatus.FilledIn;
            // логика уведомлений???
            Console.WriteLine($"План мероприятий \"{Name}\" за \"{Year}\"г. успешно отправлен");
        }
    }
}
