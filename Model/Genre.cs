namespace EADCA2_Anime.Model
{
    public class Genre
    {
        public int genre_id { get; set; }
        public string name { get; set; }
        // Navigation properties
        public ICollection<AnimeGenre> AnimeGenres { get; set; }
    }

}
