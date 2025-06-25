using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ATKApplication.Domain.Models
{
    public class EventForm3 : EventBase
    {
        public EventForm3() { }

        private EventForm3(string actor, string? name, string? content, 
                        DateOnly? date, Guid organizerId, Guid themeId, 
                        int sendTotal, int blockedTotal)
            : base(name, actor, content, date, organizerId, themeId)
        {
            SendTotal = sendTotal;
            BlockedTotal = blockedTotal;
        }

        public int SendTotal { get; set; }
        public int BlockedTotal { get; set; }

        public List<Violation> Violations { get; set; } = [];


        public static EventForm3? Create(string actor, string? name, string? content,
                        DateOnly? date, Guid organizerId, Guid themeId,
                        int sendTotal, int blockedTotal)
        {
            if (blockedTotal > sendTotal)
                return null;

            return new(actor, name, content,
                        date, organizerId, themeId,
                        sendTotal, blockedTotal);
        }
    }
}
