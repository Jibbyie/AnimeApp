using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EADCA2_Anime.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "public");

            migrationBuilder.CreateTable(
                name: "Genre",
                schema: "public",
                columns: table => new
                {
                    genre_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genre", x => x.genre_id);
                });

            migrationBuilder.CreateTable(
                name: "Studio",
                schema: "public",
                columns: table => new
                {
                    studio_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Studio", x => x.studio_id);
                });

            migrationBuilder.CreateTable(
                name: "Anime",
                schema: "public",
                columns: table => new
                {
                    anime_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    title = table.Column<string>(type: "text", nullable: false),
                    synopsis = table.Column<string>(type: "text", nullable: false),
                    start_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    end_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    season = table.Column<string>(type: "text", nullable: false),
                    duration = table.Column<int>(type: "integer", nullable: false),
                    rating = table.Column<double>(type: "double precision", nullable: false),
                    studio_id = table.Column<int>(type: "integer", nullable: true),
                    genre_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Anime", x => x.anime_id);
                    table.ForeignKey(
                        name: "FK_Anime_Genre_genre_id",
                        column: x => x.genre_id,
                        principalSchema: "public",
                        principalTable: "Genre",
                        principalColumn: "genre_id");
                    table.ForeignKey(
                        name: "FK_Anime_Studio_studio_id",
                        column: x => x.studio_id,
                        principalSchema: "public",
                        principalTable: "Studio",
                        principalColumn: "studio_id");
                });

            migrationBuilder.CreateTable(
                name: "Staff",
                schema: "public",
                columns: table => new
                {
                    staff_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    position = table.Column<string>(type: "text", nullable: false),
                    studio_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Staff", x => x.staff_id);
                    table.ForeignKey(
                        name: "FK_Staff_Studio_studio_id",
                        column: x => x.studio_id,
                        principalSchema: "public",
                        principalTable: "Studio",
                        principalColumn: "studio_id");
                });

            migrationBuilder.CreateTable(
                name: "Character",
                schema: "public",
                columns: table => new
                {
                    character_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    image_url = table.Column<string>(type: "text", nullable: false),
                    anime_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Character", x => x.character_id);
                    table.ForeignKey(
                        name: "FK_Character_Anime_anime_id",
                        column: x => x.anime_id,
                        principalSchema: "public",
                        principalTable: "Anime",
                        principalColumn: "anime_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Anime_genre_id",
                schema: "public",
                table: "Anime",
                column: "genre_id");

            migrationBuilder.CreateIndex(
                name: "IX_Anime_studio_id",
                schema: "public",
                table: "Anime",
                column: "studio_id");

            migrationBuilder.CreateIndex(
                name: "IX_Character_anime_id",
                schema: "public",
                table: "Character",
                column: "anime_id");

            migrationBuilder.CreateIndex(
                name: "IX_Staff_studio_id",
                schema: "public",
                table: "Staff",
                column: "studio_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Character",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Staff",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Anime",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Genre",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Studio",
                schema: "public");
        }
    }
}
