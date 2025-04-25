namespace ATKApplication.Models
{
    public class Support
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Receiver { get; set; }

        [Newtonsoft.Json.JsonIgnore]
        public EventBase? Event { get; set; }
        public Guid EventId { get; set; }
    }
}