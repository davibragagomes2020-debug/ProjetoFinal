using Clinica.Domain.Entities;
using Clinica.Domain.Interfaces;
using Clinica.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Clinica.Infrastructure.Repositories
{
    public class AgendamentoRepository : IAgendamentoRepository
    {
        private readonly AppDbContext _context;

        public AgendamentoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Agendamento>> ObterTodosAsync()
        {
            return await _context.Agendamentos
                .Include(a => a.Cliente)
                .Include(a => a.Profissional)
                .ThenInclude(p => p.Usuario)
                .Include(a => a.Servico)
                .ToListAsync();
        }

        public async Task<Agendamento?> ObterPorIdAsync(int id)
        {
            return await _context.Agendamentos
                .Include(a => a.Cliente)
                .Include(a => a.Profissional)
                .Include(a => a.Servico)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task AdicionarAsync(Agendamento agendamento)
        {
            await _context.Agendamentos.AddAsync(agendamento);
            await _context.SaveChangesAsync();
        }

        public async Task AtualizarAsync(Agendamento agendamento)
        {
            _context.Agendamentos.Update(agendamento);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ExisteConflitoHorarioAsync(int profissionalId, DateTime inicio, DateTime fim)
        {
            return await _context.Agendamentos
                .AnyAsync(a => a.ProfissionalId == profissionalId &&
                               a.Status != "Cancelado" &&
                               ((inicio >= a.DataHoraInicio && inicio < a.DataHoraFim) ||
                                (fim > a.DataHoraInicio && fim <= a.DataHoraFim) ||
                                (inicio <= a.DataHoraInicio && fim >= a.DataHoraFim)));
        }
    }
}