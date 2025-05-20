using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniversidadePositivo.Data;
using UniversidadePositivo.Models;

namespace UniversidadePositivo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RespostaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RespostaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Resposta>> PostResposta(Resposta resposta)
        {
            var topico = await _context.Topicos.FindAsync(resposta.TopicoId);
            if (topico == null)
                return BadRequest("Tópico não encontrado.");

            _context.Respostas.Add(resposta);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(PostResposta), new { id = resposta.Id }, resposta);
        }

        [HttpGet("topico/{topicoId}")]
        public async Task<ActionResult<IEnumerable<Resposta>>> GetRespostasPorTopico(int topicoId)
        {
            return await _context.Respostas
                                 .Where(r => r.TopicoId == topicoId)
                                 .OrderBy(r => r.DataCriacao)
                                 .ToListAsync();
        }
    }
}
