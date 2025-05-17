using ATKApplication.Contracts.Request;
using BenchmarkDotNet.Diagnosers;
using Microsoft.Extensions.Logging;

namespace ATKApplication.Models
{
    public class InterAgencyCooperation
    {
        public InterAgencyCooperation() {}
        private InterAgencyCooperation(string? organization, CoOpOrganiations organizationEnum,
                                        PerformanceType type, string? description, Guid eventId)
        {
            Id = Guid.NewGuid();
            Organization = organization;
            CoOpOrganiation = organizationEnum;
            Type = type;
            Description = description;
            EventId = eventId;
        }

        public Guid Id { get; init; }
        public string? Organization {  get; set; } // if custom
        public CoOpOrganiations CoOpOrganiation { get; set; } // if selected
        public PerformanceType Type { get; set; }
        public string? Description { get; set; }
        
        

        [Newtonsoft.Json.JsonIgnore]
        public EventForm1? Event { get; set; }
        public Guid EventId { get; init; }


        public static InterAgencyCooperation? Create(string? organization, CoOpOrganiations organizationEnum,
                                                     PerformanceType type, string? description, Guid eventId)
        {
            
            return new InterAgencyCooperation(organization, organizationEnum, type, description, eventId);
        }
    }
}
