namespace Clinica.Domain.Entities
{
    public class Agendamento
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public Usuario? Cliente { get; set; }

        public int ProfissionalId { get; set; }
        public Profissional? Profissional { get; set; }

        public int ServicoId { get; set; }
        public Servico? Servico { get; set; }

        public DateTime DataHoraInicio { get; set; }
        public DateTime DataHoraFim { get; set; }
        public string Status { get; set; } = "Pendente"; 
    }
}