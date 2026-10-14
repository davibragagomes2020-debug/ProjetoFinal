using Clinica.Domain.Entities;

namespace Clinica.Domain.Interfaces
{
    public interface IAgendamentoRepository
    {
        Task<IEnumerable<Agendamento>> ObterTodosAsync();
        Task<Agendamento?> ObterPorIdAsync(int id);
        Task AdicionarAsync(Agendamento agendamento);
        Task AtualizarAsync(Agendamento agendamento);
        
        Task<bool> ExisteConflitoHorarioAsync(int profissionalId, DateTime inicio, DateTime fim);
    }
}