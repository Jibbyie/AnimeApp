using System.Text.Json.Serialization;

namespace EADCA2_Anime.Model
{
    public class Genre
    {
        public int genre_id { get; set; }
        public string name { get; set; }
        // Navigation properties
        [JsonIgnore]
        public ICollection<AnimeGenre> AnimeGenre { get; set; }
    }

}
