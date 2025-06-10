    //atributos para a classe login
    public class Usuario
    {
        public int Id { get; set; } //chave primária p db
        public string Email { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
    }
