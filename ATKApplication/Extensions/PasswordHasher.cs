using Microsoft.AspNetCore.Identity;

namespace ATKApplication.Extensions
{
    public class PasswordHasher : IPasswordHash
    {
        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.EnhancedHashPassword(password, BCrypt.Net.HashType.SHA384);
        }

        public bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.EnhancedVerify(password, hashedPassword, BCrypt.Net.HashType.SHA384);
        }
    }
}
