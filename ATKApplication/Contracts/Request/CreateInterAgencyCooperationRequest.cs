namespace ATKApplication.Contracts.Request
{
    public record CreateInterAgencyCooperationRequest(Dictionary<string, EventDetailDto> Content);

    public class CoopOrgs(string? type, string? description)
    {
        public string? Type { get; set; } = type;
        public string? Description { get; set; } = description;
    }

    public class EventDetailDto
    {
        public string Type { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
