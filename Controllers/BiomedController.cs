/*using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniversidadePositivo.Data;
using UniversidadePositivo.Models;

namespace UniversidadePositivo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BiomedController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BiomedController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Biomed>>> GetBiomedicina()
        {
            return await _context.Biomedicina
                                 .OrderByDescending(d => d.DataCriacao)
                                 .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Biomed>> GetBiomed(int id)
        {
            var desafio = await _context.Biomedicina.FindAsync(id);
            return desafio == null ? NotFound() : desafio;
        }

        [HttpPost]
        public async Task<ActionResult<Biomed>> PostBiomed(Biomed desafio)
        {
            _context.Biomedicina.Add(desafio);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBiomed), new { id = desafio.Id }, desafio);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBiomed(int id, Biomed desafio)
        {
            if (id != desafio.Id)
                return BadRequest();

            _context.Entry(desafio).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBiomed(int id)
        {
            var desafio = await _context.Biomedicina.FindAsync(id);
            if (desafio == null)
                return NotFound();

            _context.Biomedicina.Remove(desafio);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}/*
