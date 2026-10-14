using Clinica.Domain.Entities;
using Clinica.Services.Services;
using Microsoft.AspNetCore.Mvc;

namespace Clinica.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgendamentosController : ControllerBase
    {
        private readonly AgendamentoService _agendamentoService;

        public AgendamentosController(AgendamentoService agendamentoService)
        {
            _agendamentoService = agendamentoService;
        }

        [HttpGet]
        public async Task<IActionResult> ObterTodos()
        {
            var agendamentos = await _agendamentoService.ObterTodosAsync();
            return Ok(agendamentos);
        }

        [HttpPost]
        public async Task<IActionResult> Criar([FromBody] Agendamento agendamento)
        {
            try
            {
                await _agendamentoService.CriarAgendamentoAsync(agendamento);
                return CreatedAtAction(nameof(ObterTodos), new { id = agendamento.Id }, agendamento);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Erro interno no servidor.", detalhes = ex.Message });
            }
        }
    }
}