namespace ATKApplication.Models
{
    public partial class EventForm5 : EventBase
    {
        public EventForm5() { }

        public EventForm5(string actor, string name, string content, DateOnly date, Guid organizerId, Guid themeId,
                          bool directToNAC, bool directToSubjects, DirectEnum directs, string equalToEqual)
            : base(actor, name, content, date, organizerId, themeId)
        {
            DirectToNAC = directToNAC;
            DirectToSubjects = directToSubjects;
            Directs = directs;
            EqualToEqual = equalToEqual;
        }

        public bool DirectToNAC { get; set; }
        public bool DirectToSubjects { get; set; }
        public DirectEnum Directs { get; set; }
        public string EqualToEqual { get; set; }

        public Agreement Agreement { get; set; }
        public Guid AgreementId { get; set; }
    }
}
