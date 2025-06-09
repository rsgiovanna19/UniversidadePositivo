//boa prática para autenticação do usuário no login - data transfer object -> transporta dados entre sistemas/camadas.  
public class LoginDTO
{
    public string Email { get; set; }
    public string Senha { get; set; }
}
