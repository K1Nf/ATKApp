using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace ATKApplication.Models
{
    public class Finance(int? municipalBudget, int? regionalBudget, int? granteBudget, int? otherBudget, string? description, Guid eventId)
    {
        public Guid Id { get; init; } = Guid.NewGuid();
        public int? MunicipalBudget { get; set; } = municipalBudget;
        public int? RegionalBudget { get; set; } = regionalBudget;
        public int? GranteBudget { get; set; } = granteBudget;
        public int? OtherBudget { get; set; } = otherBudget;

        [NotMapped]
        public int? Total { get; set; } = municipalBudget + regionalBudget + granteBudget + otherBudget;
        public string? Description { get; set; } = description;
        


        [Newtonsoft.Json.JsonIgnore]
        public EventForm1? Event { get; set; }
        public Guid EventId { get; set; } = eventId;
    }
}
