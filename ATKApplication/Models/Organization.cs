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

        public Organization() {}



        public Guid Id { get; init; }
        public string Name { get; set; }
        public string Password { get; set; }
        public int Rating { get; private set; }



        [JsonIgnore]
        [Newtonsoft.Json.JsonIgnore]
        public List<EventBase> Events { get; set; } = [];
        


        public static Organization Create(string name)
        {
            Console.WriteLine("Новая организация \"" + name + "\" добавлена в систему!");
            return new Organization(name);
        }



        public void SetRating(int rating) => Rating = rating;
    }
}
