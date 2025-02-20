namespace ATKApplication.Contracts
{
    public record CreateInterAgencyCooperationRequest(Guid OrganizerId, string? Content);
}