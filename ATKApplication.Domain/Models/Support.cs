using ATKApplication.Domain.Enums;
using ATKApplication.Domain.Models;

namespace ATKApplication.Domain.Models
{
    public class Support
    {
        public Support() {}
        public Support(string? receiver, SupportType type, 
                    string? description, Guid eventId)
        {
            Id = Guid.NewGuid();
            SupportType = type;
            Description = description;
            Receiver = receiver;
            EventId = eventId;
        }


        public Guid Id { get; set; }
        public string? Receiver { get; set; }
        public SupportType SupportType { get; set; }
        public string? Description { get; set; }



        [Newtonsoft.Json.JsonIgnore]
        public EventForm1? Event { get; set; }
        public Guid EventId { get; init; }
    }
}