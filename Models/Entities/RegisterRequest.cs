//API aguarda estas infos para a criação de um novo usuário + validação das regras para novo registro 

using System.ComponentModel.DataAnnotations;
public class RegisterRequest
    {
        [Required]
        public string Nome { get; set; } = string.Empty;

        [Required]
        [EmailAddress] // Adiciona validação de formato de e-mail
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)] // Exemplo: senha mínima de 6 caracteres
        public string Senha { get; set; } = string.Empty;
    }