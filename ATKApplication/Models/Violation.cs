namespace ATKApplication.Models
{
    public class Violation
    {
        public Violation() {}

        private Violation(string name, int send, int blocked, string? order, Guid eventId)
        {
            Id = Guid.NewGuid();
            Name = name;
            Send = send;
            Blocked = blocked;
            Order = order;
            EventId = eventId;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Send { get; set; }
        public int Blocked { get; set; }
        public string? Order { get; set; }


        [Newtonsoft.Json.JsonIgnore]
        public EventForm3? Event { get; set; }
        public Guid EventId { get; set; }

        

        public static Violation? Create(string name, int send, int blocked, string? order, Guid eventId)
        {
            if (blocked > send)
                return null;

            order = string.IsNullOrEmpty(order) ? null : order;

            return new(name, send, blocked, order, eventId);
        }
    }
}
