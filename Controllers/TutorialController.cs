using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniversidadePositivo.Data;
using UniversidadePositivo.Models;

namespace UniversidadePositivo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TutorialController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TutorialController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tutorial>>> GetTutoriais()
        {
            return await _context.Tutoriais.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Tutorial>> PostTutorial(Tutorial tutorial)
        {
            _context.Tutoriais.Add(tutorial);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTutoriais), new { id = tutorial.Id }, tutorial);
        }
    }
}
