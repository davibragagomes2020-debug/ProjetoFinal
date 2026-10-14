using Clinica.Domain.Entities;
using Clinica.Domain.Interfaces;

namespace Clinica.Services.Services
{
    public class AgendamentoService
    {
        private readonly IAgendamentoRepository _agendamentoRepository;

        public AgendamentoService(IAgendamentoRepository agendamentoRepository)
        {
            _agendamentoRepository = agendamentoRepository;
        }

        public async Task<IEnumerable<Agendamento>> ObterTodosAsync()
        {
            return await _agendamentoRepository.ObterTodosAsync();
        }

        public async Task<bool> CriarAgendamentoAsync(Agendamento agendamento)
        {
            // Valida se já existe choque de horário para o profissional
            bool temConflito = await _agendamentoRepository.ExisteConflitoHorarioAsync(
                agendamento.ProfissionalId, 
                agendamento.DataHoraInicio, 
                agendamento.DataHoraFim
            );

            if (temConflito)
            {
                throw new InvalidOperationException("O profissional já possui um agendamento neste horário.");
            }

            await _agendamentoRepository.AdicionarAsync(agendamento);
            return true;
        }
    }
}