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
        public string Name { get; set; }
        //public DateOnly Date { get; set; }
        public int Year { get; set; }
        public Organization? Organization { get; set; }
        public Guid OrganizationId { get; set; }



        public static Plan Create(string name, Guid organizerId, int year) 
        {
            //validation
            Plan plan = new (name, organizerId, year);
            Console.WriteLine("Создан план на " + plan.Year + "г.");
            
            return plan;
        }
    }
}
