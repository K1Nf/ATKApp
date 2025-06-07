using ATKApplication.Contracts.Request;
using ATKApplication.DataBase;
using ATKApplication.Extensions;
using CSharpFunctionalExtensions;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace ATKApplication.Services
{
    public class AuthService(DataBaseContext _dB, IPasswordHash _passwordHasher)
    {
        public Result Authorize(AuthorizeRequest authorizeRequest)
        {
            string? password = _dB.Organizations
                .AsNoTracking()
                .FirstOrDefault(o => o.Name == authorizeRequest.OrganizationName)?
                .Password;

            if (password == null)
            {
                return Result.Failure($"Не найден пользователь {authorizeRequest.OrganizationName}");
            }

            return _passwordHasher.VerifyPassword(authorizeRequest.Password, password) ?
                Result.Success() :
                Result.Failure($"Пароль неверен для {authorizeRequest.OrganizationName}!");
        }
    }
}
