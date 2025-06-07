using ATKApplication.Contracts.Request;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ATKApplication.Models
{
    public class Organization
    {
        private Organization(AllMunicipalityOrganizations name, string password, Municipalities municipality)
        {
            Id = Guid.NewGuid();
            Name = name;
            Password = password;
            Rating = 0;
            Municipality = municipality;
        }

        public Organization() {}



        public Guid Id { get; init; }
        public AllMunicipalityOrganizations Name { get; set; }

        [PasswordPropertyText]
        public string Password { get; set; }

        [Range(0, 10)]
        public int? Rating { get; private set; }
        public Municipalities Municipality { get; private set; }



        [JsonIgnore]
        [Newtonsoft.Json.JsonIgnore]
        public List<EventBase> Events { get; set; } = [];
        


        public static Organization Create(AllMunicipalityOrganizations name, string password, Municipalities municipality)
        {
            //Console.WriteLine("Новая организация \"" + name + "\" добавлена в систему!");
            return new Organization(name, password, municipality);
        }



        public void SetRating(int rating) => Rating = rating;
    }
}
