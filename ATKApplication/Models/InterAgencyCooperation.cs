namespace ATKApplication.Models
{
    public class InterAgencyCooperation(Guid eventId, string? organization, string? type, string? description)
    {
        public Guid Id { get; init; } = Guid.NewGuid();
        public Guid EventId { get; init; } = eventId;
        [Newtonsoft.Json.JsonIgnore]
        public Event? Event { get; set; }
        public string? Organization {  get; set; } = organization;
        public string? Type { get; set; } = type;
        public string? Description { get; set; } = description;
    }
}
