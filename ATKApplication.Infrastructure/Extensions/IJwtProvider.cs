using ATKApplication.Domain.Enums;

namespace ATKApplication.Infrastructure.Extensions
{
    public interface IJwtProvider
    {
        public string CreateNewToken(Guid userId);
    }
}
