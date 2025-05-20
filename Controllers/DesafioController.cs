using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniversidadePositivo.Data;
using UniversidadePositivo.Models;

namespace UniversidadePositivo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DesafioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DesafioController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Desafio>>> GetDesafios()
        {
            return await _context.Desafios
                                 .OrderByDescending(d => d.DataCriacao)
                                 .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Desafio>> GetDesafio(int id)
        {
            var desafio = await _context.Desafios.FindAsync(id);
            return desafio == null ? NotFound() : desafio;
        }

        [HttpPost]
        public async Task<ActionResult<Desafio>> PostDesafio(Desafio desafio)
        {
            _context.Desafios.Add(desafio);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDesafio), new { id = desafio.Id }, desafio);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDesafio(int id, Desafio desafio)
        {
            if (id != desafio.Id)
                return BadRequest();

            _context.Entry(desafio).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDesafio(int id)
        {
            var desafio = await _context.Desafios.FindAsync(id);
            if (desafio == null)
                return NotFound();

            _context.Desafios.Remove(desafio);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
