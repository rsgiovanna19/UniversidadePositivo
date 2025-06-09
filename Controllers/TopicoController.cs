using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniversidadePositivo.Data;
using UniversidadePositivo.Models;

//gerenciamento dos tópicos do fórum
namespace UniversidadePositivo.Controllers
{
    [ApiController]     //gerenciamento dos tópicos no banco de dados 
    [Route("api/[controller]")] 
    public class TopicoController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TopicoController(AppDbContext context)
        {
            _context = context;
        }
//apresenta todos tópicos, inclusive em ordem de criação (ordem decrescente)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Topico>>> GetTopicos()
        {
            return await _context.Topicos.Include(t => t.Respostas)
                                         .OrderByDescending(t => t.DataCriacao)
                                         .ToListAsync();
        }
//requisicao get dos tópico por ID 
        [HttpGet("{id}")]
        public async Task<ActionResult<Topico>> GetTopico(int id)
        {
            var topico = await _context.Topicos.Include(t => t.Respostas)
                                               .FirstOrDefaultAsync(t => t.Id == id);
            return topico == null ? NotFound() : topico;
        }
//requisição post para postagem dos tópicos
        [HttpPost]
        public async Task<ActionResult<Topico>> PostTopico(Topico topico)
        {
            _context.Topicos.Add(topico);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTopico), new { id = topico.Id }, topico);
        }
//postagem/atualização dos tópicos por id 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTopico(int id, Topico topico)
        {
            if (id != topico.Id)
                return BadRequest();

            _context.Entry(topico).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
//caso haja necessidade, exclusão de algum tópico por requisição delete pelo ID dele
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTopico(int id)
        {
            var topico = await _context.Topicos.FindAsync(id);
            if (topico == null)
                return NotFound();

            _context.Topicos.Remove(topico);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
