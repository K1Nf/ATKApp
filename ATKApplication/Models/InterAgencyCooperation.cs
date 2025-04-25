namespace ATKApplication.Models
{
    public class InterAgencyCooperation(Guid eventId, string? organization, string? type, string? description)
    {
        public Guid Id { get; init; } = Guid.NewGuid();
        public string? Organization {  get; set; } = organization;
        public string? Type { get; set; } = type;
        public string? Description { get; set; } = description;
        
        

        [Newtonsoft.Json.JsonIgnore]
        public EventForm2? Event { get; set; }
        public Guid EventId { get; init; } = eventId;
    }
}
