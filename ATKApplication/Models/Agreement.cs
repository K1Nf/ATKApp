using ATKApplication.Enums;

namespace ATKApplication.Models
{
    public class Agreement
    {
        public Agreement() {}

        private Agreement(string? description, string organization, ResultEnum result, Guid eventId)
        {
            Id = Guid.NewGuid();
            Description = description;
            Organization = organization;
            Result = result;
            EventId = eventId;
        }
        public Guid Id { get; set; }
        public string? Description { get; set; }
        public string Organization { get; set; }
        public ResultEnum Result { get; set; }

        [Newtonsoft.Json.JsonIgnore]
        public EventForm4? Event { get; set; }
        public Guid EventId { get; set; }


        public static Agreement? Create(string? description, string organization, ResultEnum result, Guid eventId)
        {
            return new Agreement(string.IsNullOrEmpty(description) ? null : description, organization, result, eventId);
        }
    }
}
