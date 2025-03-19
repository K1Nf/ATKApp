using System.Text.Json.Serialization;

namespace ATKApplication.Models
{
    public class Organization
    {
        private Organization(string name)
        {
            Id = Guid.NewGuid();
            Name = name;
            Rating = 0;
        }
        public Organization()
        {
            
        }

        public Guid Id { get; init; }
        public string Name { get; set; }
        public int Rating { get; private set; }

        public Organization? Municipality { get; set; }
        public Guid? MunicipalityId { get; set; }

        public Guid RoleId { get; init; }
        //public Role? Role { get; set; }

        [JsonIgnore]
        [Newtonsoft.Json.JsonIgnore]
        public List<Event> Events { get; set; } = [];
        


        public static Organization Create(string name)
        {
            Console.WriteLine("Новая организация \"" + name + "\" добавлена в систему!");
            return new Organization(name);
        }



        public void SetRating(int rating) => Rating = rating;
    }
}
