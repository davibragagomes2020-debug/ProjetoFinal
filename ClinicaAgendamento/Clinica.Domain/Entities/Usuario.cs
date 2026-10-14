namespace Clinica.Domain.Entities
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string SenhaHash { get; set; } = string.Empty;
        public string TipoPerfil { get; set; } = string.Empty; // Ex: 'Admin', 'Profissional', 'Cliente'
        
        // Propriedade de navegação (Opcional, se for profissional)
        public Profissional? Profissional { get; set; }
    }
}