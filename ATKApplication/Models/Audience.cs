using ATKApplication.Enums;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace ATKApplication.Models
{
    public class Audience
    {
        public Audience() {}
        public Audience(string category, Guid eventId /*Audiences audiences, string? description,*/)
        {
            Id = Guid.NewGuid();
            Category = category;
            //Audiences = audiences;
            //Description = description;
            EventId = eventId;
        }

        public Guid Id { get; set; }
        public string Category { get; set; }
        //public Audiences Audiences { get; }
        //public string? Description { get; }


        [Newtonsoft.Json.JsonIgnore]
        public EventForm1? Event { get; set; }
        public Guid EventId { get; init; }
    }
}
