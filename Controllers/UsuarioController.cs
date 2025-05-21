using Microsoft.AspNetCore.Mvc;
using UniversidadePositivo.Models; // Ajuste conforme seu namespace
using UniversidadePositivo.Data;   // Ajuste conforme seu namespace
using System.Linq;

namespace UniversidadePositivo.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _context; // ✅ Adicionado o campo do contexto

        // ✅ Construtor que recebe o contexto via injeção de dependência
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
    }
}
