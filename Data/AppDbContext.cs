using Microsoft.EntityFrameworkCore;
using UniversidadePositivo.Models;

namespace UniversidadePositivo.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) {}

        public DbSet<Tutorial> Tutoriais { get; set; }
        public DbSet<Topico> Topicos { get; set; }
        public DbSet<Resposta> Respostas { get; set; }
        public DbSet<Desafio> Desafios { get; set; }

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
