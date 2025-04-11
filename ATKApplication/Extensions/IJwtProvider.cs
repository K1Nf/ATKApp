namespace ATKApplication.Extensions
{
    public interface IJwtProvider
    {
        public string? CreateNewToken(int userId);
    }
}
