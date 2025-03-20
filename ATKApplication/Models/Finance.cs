using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace ATKApplication.Models
{
    public class Finance(int? municipalBudget, int? regionalBudget, int? granteBudget, int? otherBudget, Guid eventId, string? description)
    {
        public Guid Id { get; init; } = Guid.NewGuid();
        public int? MunicipalBudget { get; set; } = municipalBudget;
        public int? RegionalBudget { get; set; } = regionalBudget;
        public int? GranteBudget { get; set; } = granteBudget;
        public int? OtherBudget { get; set; } = otherBudget;
        public string? Description { get; set; } = description;
        
        [NotMapped]
        public int? Total { get; set; } = municipalBudget + regionalBudget + granteBudget + otherBudget;

        public Guid EventId { get; set; } = eventId;
        
        [Newtonsoft.Json.JsonIgnore]
        public Event? Event { get; set; }



        public int? GetSum() => MunicipalBudget + RegionalBudget + GranteBudget + OtherBudget; 
    }
}
