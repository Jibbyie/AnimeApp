using System.Text.Json.Serialization;

namespace EADCA2_Anime.Model
{
    public class AnimeCharacter
    {
        public int anime_id { get; set; }
        [JsonIgnore]
        public Anime Anime { get; set; }

        public int character_id { get; set; }
        [JsonIgnore]
        public Character Character { get; set; }
    }


}
