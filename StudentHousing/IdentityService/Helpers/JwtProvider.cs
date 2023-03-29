using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using IdentityService.Models;
using Microsoft.IdentityModel.Tokens;

namespace IdentityService.Helpers
{
    public class JwtProvider
    {
        private readonly IConfiguration _configuration;
        public JwtProvider(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(ApplicationUser user)
        {
            var claims = new Claim[]
            {
                new(JwtRegisteredClaimNames.Sub, user.Id)
            };

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"])), SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToInt32(_configuration["Jwt:MinutesUntilExpiry"])),
                signingCredentials: signingCredentials
            );

            string tokenValue = new JwtSecurityTokenHandler()
                .WriteToken(token);
            return tokenValue;
        }


    }
}