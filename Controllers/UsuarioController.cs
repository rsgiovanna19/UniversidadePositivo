using Microsoft.AspNetCore.Mvc;
using UniversidadePositivo.Models;
using UniversidadePositivo.Data;
using System.Linq;

namespace UniversidadePositivo.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuarioController(AppDbContext context)
        {
            _context = context;
        }

        // POST: cadastrar novo usuário
        [HttpPost]
        public IActionResult Cadastrar([FromBody] Usuario usuario)
        {
            if (_context.Usuario.Any(u => u.Email == usuario.Email))
            {
                return Conflict("Email já cadastrado.");
            }

            _context.Usuario.Add(usuario);
            _context.SaveChanges();
            return Ok("Usuário cadastrado com sucesso!");
        }

        // ✅ POST: api/usuarios/
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO login)
        {
            var usuarioEncontrado = _context.Usuario
                .FirstOrDefault(u => u.Email == login.Email && u.Senha == login.Senha);

            if (usuarioEncontrado == null)
                return NotFound("Email ou senha inválidos.");

            return Ok(usuarioEncontrado);
        }

    }
}
