namespace ATKApplication.Contracts.Request
{
    public record CreateInterAgencyCooperationRequest(List<CoopOrgs?>? Content);

    public class CoopOrgs(string? type, string? description)
    {
        public string? Type { get; set; } = type;
        public string? Description { get; set; } = description;
    }
}
