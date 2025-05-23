using Microsoft.EntityFrameworkCore;
using UniversidadePositivo.Models;

namespace UniversidadePositivo.Data
{
    //referenciamento do banco de dados - tabelas necessárias
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Topico> Topicos { get; set; }
        public DbSet<Resposta> Respostas { get; set; }
        public DbSet<Usuario> Usuario { get; set; }

        //mapeamento entre a resposta do forum e a resposta 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Resposta>()
                .HasOne(r => r.Topico)
                .WithMany(t => t.Respostas)
                .HasForeignKey(r => r.TopicoId);
            base.OnModelCreating(modelBuilder);
        }
    }
}
