using Microsoft.AspNetCore.Mvc;
using UniversidadePositivo.Data;
using UniversidadePositivo.security;
using Microsoft.AspNetCore.Authorization;

namespace UniversidadePositivo.Controllers
{
    [ApiController]
    [Route("api/usuarios")] 
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenGenerator _tokenGenerator; // Injeção do TokenGenerator no banco de dados
        public UsuarioController(AppDbContext context, TokenGenerator tokenGenerator)
        {
            _context = context;
            _tokenGenerator = tokenGenerator;
        }

        //Realizando o registro
        [HttpPost("register")] 
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

        //Realizando o login
        [HttpPost("login")] 
        public IActionResult Login([FromBody] LoginRequest request) // Usa o novo LoginRequest
        {
            // Validações básicas do request
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Senha))
            {
                return BadRequest("Email e senha são obrigatórios.");
            }
            // Busca do usuário pelo email no banco de dados
            var usuarioEncontrado = _context.Usuario
                .FirstOrDefault(u => u.Email == request.Email);

            // Verifica se o usuário existe e se a senha está correta (usando o hasher)
            if (usuarioEncontrado == null || !PasswordHasher.VerifyPassword(request.Senha, usuarioEncontrado.PasswordHash))
            {
                return Unauthorized("Email ou senha inválidos."); // Retorno de mensagem caso seja inválido
            }
            // Se o login for bem-sucedido, gera o token JWT
            var token = _tokenGenerator.GenerateToken(
                usuarioEncontrado.Id.ToString(),
                usuarioEncontrado.Nome,    
                usuarioEncontrado.Email
            );
            return Ok(new AuthResponse      //retorno de mensagem de sucesso
            {
                Token = token,
                Message = "Login realizado com sucesso!",
                UserId = usuarioEncontrado.Id,
                UserName = usuarioEncontrado.Nome
            });
        }
        [HttpGet("protected")]  //protected pois o endpoint é somente acessado com o token JWT - mostrar no swagger
        [Authorize] // Este atributo p proteger o endpoint (sugestão da IA)
        public IActionResult GetProtectedData() //retorno de msg pela IActionResult
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;   //ID 
            var userName = User.FindFirst(System.Security.Claims.ClaimTypes.Name)?.Value;
            var userEmail = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value; //Email
            return Ok(new
            {
                Message = $"Olá {userName}! Você acessou dados protegidos.",
                UserId = userId,
                UserEmail = userEmail
            });
        }
    }
}