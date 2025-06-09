public class AuthResponse
    {
        public string Token { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public int UserId { get; set; } // Opcional: retornar o ID do usuário
        public string UserName { get; set; } = string.Empty; // Opcional: retornar o nome do usuário
    }
