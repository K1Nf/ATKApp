using ATKApplication.Models;

namespace ATKApplication.Models
{
    public class Support
    {
        public Support(string receiver, string? information, 
                    string? methodological, string? organizational, 
                    string? financial, string? other,
                    Guid eventId)
        {
            Id = Guid.NewGuid();
            Receiver = receiver;
            Information = information;
            Methodological = methodological;
            Organizational = organizational;
            Financial = financial;
            Other = other;
            EventId = eventId;
        }


        public Guid Id { get; set; }
        public string Receiver { get; set; }
        public string Information { get; set; }
        public string Methodological { get; set; }
        public string Organizational { get; set; }
        public string Financial { get; set; }
        public string Other { get; set; }



        [Newtonsoft.Json.JsonIgnore]
        public EventBase? Event { get; set; }
        public Guid EventId { get; set; }
    }
}