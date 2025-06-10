// formato exato que os dados de login devem ter quando o programa (frontend) os envia para a API

using System.ComponentModel.DataAnnotations;
public class LoginRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Senha { get; set; } = string.Empty;
    }