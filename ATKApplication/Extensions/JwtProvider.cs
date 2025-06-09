
using ATKApplication.Contracts.Request;
using ATKApplication.DataBase;
using ATKApplication.Enums;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ATKApplication.Extensions
{
    public class JwtProvider(IOptions<JWTConfiguration> options) : IJwtProvider 
    {
        private readonly JWTConfiguration _jwtConfiguration = options.Value;

        public string CreateNewToken(Guid userId)
        {
            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfiguration.SecretKey)), SecurityAlgorithms.HmacSha384);

            Claim[] claims = [
                new(_jwtConfiguration.OrganizationId, userId.ToString()),
                ];


            var token = new JwtSecurityToken(
                claims: claims,
                signingCredentials: signingCredentials,
                expires: DateTime.UtcNow.AddMinutes(_jwtConfiguration.ExpiresMinutes),
                issuer: _jwtConfiguration.Issuer,
                audience: _jwtConfiguration.Audience
                );


            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
