namespace ATKApplication.Contracts
{
    public record CreateParticipantsRequest(int? SchoolKids, int? Students, int? RegisteredPersons,
                                            int? Migrants, int? WorkingYouth, int? UnemployedYouth, int? Total);
}