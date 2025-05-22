namespace ATKApplication.Models
{
    public partial class EventForm4 : EventBase
    {
        public EventForm4() { }

        public EventForm4(string actor, string name, string content, 
                        DateOnly? date, Guid organizerId, Guid themeId,
                        bool directToNAC, string directToSubjects, string equalToEqual)

            : base(actor, name, content, date, organizerId, themeId)
        {
            DirectToNAC = directToNAC;
            DirectToSubjects = directToSubjects;
            EqualToEqual = equalToEqual;
        }

        public bool DirectToNAC { get; set; }
        public string? DirectToSubjects { get; set; }
        public string EqualToEqual { get; set; }


        public List<Agreement> Agreements { get; set; }
    }
}
