using Microsoft.AspNetCore.Mvc;

namespace SeuProjeto.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class UsuariosController : ControllerBase
    {
        [HttpPost]
        public IActionResult Cadastrar([FromBody] Usuario usuario)
        {
            // Aqui você pode adicionar à base de dados, validar, etc.
            return Ok("Usuário cadastrado com sucesso!");
        }
    }
}
