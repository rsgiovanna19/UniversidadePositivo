//atributos para a classe resposta
namespace UniversidadePositivo.Models
{
public class Resposta
{
    public int Id { get; set; }
    public string Conteudo { get; set; }
    public string Autor { get; set; }
    public DateTime DataCriacao { get; set; } = DateTime.Now;

    public int TopicoId { get; set; }
    public Topico Topico { get; set; }
}
}