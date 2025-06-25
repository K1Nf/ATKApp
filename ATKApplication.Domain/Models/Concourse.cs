namespace ATKApplication.Domain.Models
{
    public class Concourse
    {
        public Concourse(string description, string result, string? details, Guid eventId)
        {
            Id = Guid.NewGuid();
            Description = description;
            Result = result;
            Details = string.IsNullOrEmpty(details) ? null: details;
            EventId = eventId;
        }
        public Guid Id { get; init; }
        public string Description { get; set; }
        public string Result { get; set; }
        public string? Details { get; set; }


        [Newtonsoft.Json.JsonIgnore]
        public EventForm1? Event { get; set; }
        public Guid EventId { get; set; }
    }
}
