using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Clinica.Infrastructure.Context;
using Clinica.Domain.Entities;

namespace Clinica.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServicosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var servicos = await _context.Servicos.ToListAsync();
            return Ok(servicos);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Servico servico)
        {
            _context.Servicos.Add(servico);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = servico.Id }, servico);
        }
    }
}