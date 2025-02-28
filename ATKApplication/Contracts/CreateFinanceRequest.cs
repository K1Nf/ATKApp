namespace ATKApplication.Contracts
{
    public record CreateFinanceRequest(int? MunicipalBudget, int? RegionalBudget, int? GranteBudget, int? OtherBudget);
}
