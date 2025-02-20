namespace ATKApplication.Models
{
    public class Finance(int? municipalBudget, int? regionalBudget, int? granteBudget, int? otherBudget, Guid eventId)
    {
        public Guid Id { get; init; }
        public int? MunicipalBudget { get; set; } = municipalBudget;
        public int? RegionalBudget { get; set; } = regionalBudget;
        public int? GranteBudget { get; set; } = granteBudget;
        public int? OtherBudget { get; set; } = otherBudget;

        public Guid EventId { get; set; } = eventId;
        public Event? Event { get; set; }



        public int? GetSum() => MunicipalBudget + RegionalBudget + GranteBudget + OtherBudget; 
    }
}
