namespace ATKApplication.Contracts.Request
{
    public record ViolationDTO(int BlockedCount, string? Decision, string? OrderNumber,
                                string? OtherText, int SentCount, bool Checked);
}