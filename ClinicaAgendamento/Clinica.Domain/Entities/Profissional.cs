namespace Clinica.Domain.Entities
{
    public class Profissional
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; } // Chave estrangeira para Usuario
        public Usuario? Usuario { get; set; } // Propriedade de navegação
        public string Especialidade { get; set; } = string.Empty;

        // Lista de agendamentos associados a este profissional
        public ICollection<Agendamento> Agendamentos { get; set; } = new List<Agendamento>();
    }
}