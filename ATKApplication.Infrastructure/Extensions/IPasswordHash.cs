namespace ATKApplication.Infrastructure.Extensions
{
    public interface IPasswordHash
    {
        public string HashPassword(string password);
        public bool VerifyPassword(string password, string hashedPassword);
    }
}