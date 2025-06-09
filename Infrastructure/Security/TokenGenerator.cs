// security/TokenGenerator.cs
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace UniversidadePositivo.security // Garanta que este namespace está correto para seu projeto
{
    public class TokenGenerator
    {
        private readonly IConfiguration _configuration;

        public TokenGenerator(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // ALTERE ESTA LINHA PARA INCLUIR 'string userEmail'
        public string GenerateToken(string userId, string userName, string userEmail) // <-- ADICIONADO userEmail
        {
            var jwtKey = _configuration["Jwt:Key"];
            var jwtIssuer = _configuration["Jwt:Issuer"];
            var jwtAudience = _configuration["Jwt:Audience"];

            if (string.IsNullOrEmpty(jwtKey) || string.IsNullOrEmpty(jwtIssuer) || string.IsNullOrEmpty(jwtAudience))
            {
                throw new InvalidOperationException("JWT configuration (Key, Issuer, Audience) is missing or empty.");
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Adicione as informações que você quer que o token carregue
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId), // ID do usuário
                new Claim(ClaimTypes.Name, userName),        // Nome do usuário
                new Claim(ClaimTypes.Email, userEmail)       // <-- ADICIONADA ESTA LINHA
                // Adicione outras claims conforme necessário (ex: ClaimTypes.Role para roles)
            };

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: DateTime.Now.AddHours(2), // Token expira em 2 horas (ajuste conforme necessário)
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}