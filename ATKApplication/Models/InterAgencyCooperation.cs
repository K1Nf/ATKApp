namespace ATKApplication.Models
{
    public class InterAgencyCooperation(Guid eventId, Guid organizerId, string? content)
    {
        public Guid EventId { get; init; } = eventId;
        public Guid OrganizerId { get; init; } = organizerId;
        public Event? Event { get; set; }
        public Organization? Organization { get; set; }
        public string? Content { get; set; } = content;
    }
}
