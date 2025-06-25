using ATKApplication.Domain.Enums;
using Newtonsoft.Json;

namespace ATKApplication.Domain.Models
{
    public class Audience
    {
        public Audience() {}

        private Audience(string category, Guid eventId)
        {
            Id = Guid.NewGuid();
            Category = category;
            EventId = eventId;
        }

        public Guid Id { get; set; }
        public string Category { get; set; }


        [Newtonsoft.Json.JsonIgnore]
        public EventForm1? Event { get; set; }
        public Guid EventId { get; init; }


        public static Audience? Create(string category, Guid eventId)
        {
            return string.IsNullOrEmpty(category) ?
                null :
                new Audience(category, eventId);
        }
    }
}
