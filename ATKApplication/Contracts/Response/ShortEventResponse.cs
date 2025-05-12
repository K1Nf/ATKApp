namespace ATKApplication.Contracts.Response
{
    public class ShortEventResponse
    {
        public Guid Id { get; init; }
        public string ThemeCode { get; init; }
        public string Name { get; init; }
        public string Actor { get; init; }
        public string[]? Links { get; init; }
        public DateOnly? Date { get; init; }
        //public string IsValuable { get; init; }
        //public string IsBestPractice { get; init; }
        public string OrganizerName { get; init; }
        public int? ParticipantsCount { get; init; }
    }
}
