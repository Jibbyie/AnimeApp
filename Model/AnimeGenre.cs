using System.Text.Json.Serialization;

namespace EADCA2_Anime.Model
{
    public class AnimeGenre
    {
        public int anime_id { get; set; }
        [JsonIgnore]
        public Anime Anime { get; set; }

        public int genre_id { get; set; }
        [JsonIgnore]
        public Genre Genre { get; set; }
    }

}
