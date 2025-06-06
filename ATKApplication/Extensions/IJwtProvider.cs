namespace ATKApplication.Extensions
{
    public interface IJwtProvider
    {
        public string? CreateNewToken(Guid userId);
    }
}
