using Microsoft.AspNetCore.Mvc;
using UniversidadePositivo.Models;
using UniversidadePositivo.Data;
using System.Linq;
using UniversidadePositivo.security; // Importe o namespace da sua pasta security
using Microsoft.AspNetCore.Authorization; // Necessário para o atributo [Authorize]

namespace UniversidadePositivo.Controllers
{
    [ApiController]
    [Route("api/usuarios")] // Sua rota existente
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenGenerator _tokenGenerator; // Injetar o TokenGenerator

        public UsuarioController(AppDbContext context, TokenGenerator tokenGenerator)
        {
            _context = context;
            _tokenGenerator = tokenGenerator;
        }

        // POST: api/usuarios/register - Cadastrar novo usuário
        // OBS: Você tinha [HttpPost] e depois [HttpPost("login")]. Ajustei para Register e Login.
        [HttpPost("register")] // Rota específica para registro
        public IActionResult Register([FromBody] RegisterRequest request) // Usa o novo RegisterRequest
        {
            // Validações básicas do request
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Senha))
            {
                return BadRequest("Email e senha são obrigatórios.");
            }

            // Verifica se o email já está cadastrado no banco de dados
            if (_context.Usuario.Any(u => u.Email == request.Email))
            {
                return Conflict("Email já cadastrado.");
            }

            // Cria um novo objeto Usuario com a senha hasheada
            var newUser = new Usuario
            {
                Nome = request.Nome,
                Email = request.Email,
                PasswordHash = PasswordHasher.HashPassword(request.Senha) // Hasheando a senha
            };

            _context.Usuario.Add(newUser); // Adiciona ao contexto do EF Core
            _context.SaveChanges(); // Salva no banco de dados

            return Ok("Usuário cadastrado com sucesso!");
        }

        // POST: api/usuarios/login - Realizar login
        [HttpPost("login")] // Rota específica para login
        public IActionResult Login([FromBody] LoginRequest request) // Usa o novo LoginRequest
        {
            // Validações básicas do request
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Senha))
            {
                return BadRequest("Email e senha são obrigatórios.");
            }

            // Busca o usuário pelo email no banco de dados
            var usuarioEncontrado = _context.Usuario
                .FirstOrDefault(u => u.Email == request.Email);

            // Verifica se o usuário existe e se a senha está correta (usando o hasher)
            if (usuarioEncontrado == null || !PasswordHasher.VerifyPassword(request.Senha, usuarioEncontrado.PasswordHash))
            {
                return Unauthorized("Email ou senha inválidos."); // Mensagem genérica para segurança
            }

            // Se o login for bem-sucedido, gera o token JWT
            var token = _tokenGenerator.GenerateToken(
                usuarioEncontrado.Id.ToString(),    // userId
                usuarioEncontrado.Nome,             // userName
                usuarioEncontrado.Email             // userEmail (este é o 3º argumento que faltava)
            );

            return Ok(new AuthResponse
            {
                Token = token,
                Message = "Login realizado com sucesso!",
                UserId = usuarioEncontrado.Id,
                UserName = usuarioEncontrado.Nome
            });
        }

        // GET: api/usuarios/protected - Exemplo de endpoint protegido
        // Só pode ser acessado com um token JWT válido
        [HttpGet("protected")]
        [Authorize] // Este atributo protege o endpoint!
        public IActionResult GetProtectedData()
        {
            // Como acessar as informações do usuário do token (claims)
            // Lembre-se: ClaimTypes.NameIdentifier é o ID, ClaimTypes.Name é o nome, ClaimTypes.Email é o email
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            var userName = User.FindFirst(System.Security.Claims.ClaimTypes.Name)?.Value;
            var userEmail = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;

            return Ok(new {
                Message = $"Olá {userName}! Você acessou dados protegidos.",
                UserId = userId,
                UserEmail = userEmail
            });
        }

        // Se você tiver outros métodos como GetAll, GetById, etc., eles devem ser protegidos com [Authorize]
        // ou ter sua própria lógica de acesso.
    }
}