namespace ATKApplication.Contracts.Request
{
    public record CreateSupportRequest(string? Supported, Dictionary<SupportType, string?> Supports);
}