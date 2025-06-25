using ATKApplication.Domain.Enums;

namespace ATKApplication.Domain.Models
{
    public class InterAgencyCooperation
    {
        public InterAgencyCooperation() {}
        private InterAgencyCooperation(string? organization, CoOpOrganiations organizationEnum,
                                        string role, string? description, Guid eventId)
        {
            Id = Guid.NewGuid();
            Organization = organization;
            CoOpOrganiation = organizationEnum;
            Role = role;
            Description = description;
            EventId = eventId;
        }

        public Guid Id { get; init; }
        public string? Organization {  get; set; } // if custom
        public CoOpOrganiations CoOpOrganiation { get; set; } // if selected
        public string Role { get; set; }
        public string? Description { get; set; }
        
        

        [Newtonsoft.Json.JsonIgnore]
        public EventForm1? Event { get; set; }
        public Guid EventId { get; init; }


        public static InterAgencyCooperation? Create(string? organization, CoOpOrganiations organizationEnum,
                                                     string role, string? description, Guid eventId)
        {
            
            return new InterAgencyCooperation(organization, organizationEnum, role, description, eventId);
        }
    }
}
