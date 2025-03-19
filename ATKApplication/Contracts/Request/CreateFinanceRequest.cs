namespace ATKApplication.Contracts.Request
{
    public record CreateFinanceRequest(int? MunicipalBudget, int? RegionalBudget, int? GranteBudget, int? OtherBudget);
}
