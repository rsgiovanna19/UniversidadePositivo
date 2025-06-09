    //usuario para login ou chamada ja existente
    public class Usuario
    {
        public int Id { get; set; } //chave primária p db
        public string Email { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
    }
