using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Clinica.Infrastructure.Context;
using Clinica.Domain.Entities;

namespace Clinica.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfissionaisController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProfissionaisController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var profissionais = await _context.Profissionais.ToListAsync();
            return Ok(profissionais);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Profissional profissional)
        {
            _context.Profissionais.Add(profissional);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = profissional.Id }, profissional);
        }
    }
}