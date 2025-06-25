using ATKApplication.Contracts.Request;
using ATKApplication.Infrastructure.DataBase;
using ATKApplication.Infrastructure.Extensions;
using ATKApplication.Extensions;
using CSharpFunctionalExtensions;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace ATKApplication.Services
{
    public class AuthService(DataBaseContext _dB, 
                            IPasswordHash _passwordHasher, 
                            IJwtProvider jwtProvider)
    {
        public Result<string> Authorize(AuthorizeRequest authorizeRequest)
        {
            var organization = _dB.Organizations
                .AsNoTracking()
                .FirstOrDefault(o => o.Name == authorizeRequest.OrganizationName);
                //.Password;

            if (organization == null)
            {
                return Result.Failure<string>($"Не найден пользователь {authorizeRequest.OrganizationName}");
            }


            if (_passwordHasher.VerifyPassword(authorizeRequest.Password, organization.Password))
            {
                string token = jwtProvider.CreateNewToken(organization.Id);
                return Result.Success(token);
            }

            return Result.Failure<string>($"Пароль неверен для {authorizeRequest.OrganizationName}!");
        }
    }
}
