//atributos para a classe topicos
namespace UniversidadePositivo.Models
{
public class Topico
{
    public int Id { get; set; }
    public string Titulo { get; set; }
    public string Conteudo { get; set; }
    public string Autor { get; set; }
    public DateTime DataCriacao { get; set; } = DateTime.Now;
    public List<Resposta> Respostas { get; set; } = new List<Resposta>();
}
}