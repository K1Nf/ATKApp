namespace ATKApplication.Contracts.Request
{
    public record CreateParticipantsRequest(int? SchoolKids, int? Students, int? RegisteredPersons,
                                            int? Migrants, int? WorkingYouth, int? NotWorkingYouth);
}