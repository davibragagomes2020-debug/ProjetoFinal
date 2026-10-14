namespace Clinica.Domain.Entities
{
    public class Servico
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public decimal Preco { get; set; }
        public int DuracaoMinutos { get; set; } // Usado para calcular o horário final do agendamento

        public ICollection<Agendamento> Agendamentos { get; set; } = new List<Agendamento>();
    }
}