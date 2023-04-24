using EADCA2_Anime.Model;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;

public class AnimeDbContext : DbContext
{
    public AnimeDbContext(DbContextOptions<AnimeDbContext> options)
        : base(options)
    { }

    public DbSet<Anime> Anime { get; set; }
    public DbSet<Studio> Studio { get; set; }
    public DbSet<Genre> Genres { get; set; }
    public DbSet<AnimeGenre> AnimeGenre { get; set; }
    public DbSet<Character> Character { get; set; }
    public DbSet<AnimeCharacter> AnimeCharacter { get; set; }
    public DbSet<Staff> Staff { get; set; }
    public DbSet<AnimeStaff> AnimeStaff { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Anime>()
            .HasKey(an => an.anime_id);

        modelBuilder.Entity<Anime>()
            .HasOne(an => an.Studio)
            .WithMany(a => a.Anime)
            .HasForeignKey(an => an.studio_id);


        modelBuilder.Entity<Studio>()
            .HasKey(st => st.studio_id);

        modelBuilder.Entity<Genre>()
            .HasKey(ge => ge.genre_id);


        modelBuilder.Entity<Staff>()
            .HasKey(sta => sta.staff_id);

        modelBuilder.Entity<Character>()
            .HasKey(cha => cha.character_id);



        modelBuilder.Entity<AnimeGenre>()
            .HasKey(ag => new { ag.anime_id, ag.genre_id });

        modelBuilder.Entity<AnimeGenre>()
            .HasOne(ag => ag.Anime)
            .WithMany(a => a.AnimeGenre)
            .HasForeignKey(ag => ag.anime_id);

        modelBuilder.Entity<AnimeGenre>()
            .HasOne(ag => ag.Genre)
            .WithMany(g => g.AnimeGenre)
            .HasForeignKey(ag => ag.genre_id);

        modelBuilder.Entity<AnimeCharacter>()
            .HasKey(ac => new { ac.anime_id, ac.character_id });

        modelBuilder.Entity<AnimeCharacter>()
            .HasOne(ac => ac.Anime)
            .WithMany(a => a.AnimeCharacter)
            .HasForeignKey(ac => ac.anime_id);

        modelBuilder.Entity<AnimeCharacter>()
            .HasOne(ac => ac.Character)
            .WithMany(c => c.AnimeCharacter)
            .HasForeignKey(ac => ac.character_id);

        modelBuilder.Entity<AnimeStaff>()
            .HasKey(ast => new { ast.anime_id, ast.staff_id });

        modelBuilder.Entity<AnimeStaff>()
            .HasOne(ast => ast.Anime)
            .WithMany(a => a.AnimeStaff)
            .HasForeignKey(ast => ast.anime_id);

        modelBuilder.Entity<AnimeStaff>()
            .HasOne(ast => ast.Staff)
            .WithMany(s => s.AnimeStaff)
            .HasForeignKey(ast => ast.staff_id);
    }
}