using ATKApplication.Enums;

namespace ATKApplication.Models
{
    public class Agreement
    {
        public Agreement() {}

        private Agreement(string description, OrganizationEnum organization, Guid eventId)
        {
            Id = Guid.NewGuid();
            Description = description;
            Organization = organization;
            EventId = EventId;
        }
        public Guid Id { get; set; }
        public string Description { get; set; }
        public OrganizationEnum Organization { get; set; }

        [Newtonsoft.Json.JsonIgnore]
        public EventForm4? Event { get; set; }
        public Guid EventId { get; set; }


        public static Agreement? Create(string description, OrganizationEnum organization, Guid eventId)
        {
            return new Agreement(description, organization, eventId);
        }
    }
}
