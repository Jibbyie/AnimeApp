using EADCA2_Anime.Model;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using System;

public class AnimeDbContext : DbContext
{
    public AnimeDbContext(DbContextOptions<AnimeDbContext> options)
        : base(options)
    { }

    public DbSet<Anime> Anime { get; set; }
    public DbSet<Studio> Studio { get; set; }
    public DbSet<Genre> Genre { get; set; }
    public DbSet<Character> Character { get; set; }
    public DbSet<Staff> Staff { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Anime>()
            .HasKey(an => an.anime_id);

        modelBuilder.Entity<Anime>()
            .HasOne(an => an.Studio)
            .WithMany(a => a.Anime)
            .HasForeignKey(an => an.studio_id);

        modelBuilder.Entity<Anime>()
            .HasOne(an => an.Genre)
            .WithMany(ge => ge.Anime)
            .HasForeignKey(an => an.genre_id);


        modelBuilder.Entity<Studio>()
            .HasKey(st => st.studio_id);


        modelBuilder.Entity<Genre>()
            .HasKey(ge => ge.genre_id);


        modelBuilder.Entity<Staff>()
            .HasKey(sta => sta.staff_id);


        modelBuilder.Entity<Staff>()
            .HasOne(an => an.Studio)
            .WithMany(a => a.Staff)
            .HasForeignKey(an => an.studio_id);

        modelBuilder.Entity<Character>()
            .HasKey(cha => cha.character_id);


        modelBuilder.Entity<Character>()
            .HasOne(an => an.Anime)
            .WithMany(cha => cha.Character)
            .HasForeignKey(an => an.anime_id);


    }
}