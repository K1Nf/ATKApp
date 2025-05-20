using ATKApplication.Contracts.Request;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace ATKApplication.Models
{
    public class Audience
    {
        public Audience() {}
        public Audience(Audiences audiences, string? description, Guid eventId)
        {
            Id = Guid.NewGuid();
            Audiences = audiences;
            Description = description;
            EventId = eventId;
        }

        public Guid Id { get; set; }
        public Audiences Audiences { get; }
        public string? Description { get; }


        [Newtonsoft.Json.JsonIgnore]
        public EventBase? Event { get; set; }
        public Guid EventId { get; set; }
    }
}
