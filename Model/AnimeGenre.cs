namespace EADCA2_Anime.Model
{
    public class AnimeGenre
    {
        public int anime_id { get; set; }
        public Anime Anime { get; set; }

        public int genre_id { get; set; }
        public Genre Genre { get; set; }
    }

}
