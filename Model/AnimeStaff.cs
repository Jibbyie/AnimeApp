using System.Text.Json.Serialization;

namespace EADCA2_Anime.Model
{
    public class AnimeStaff
    {
        public int anime_id { get; set; }
        [JsonIgnore]
        public Anime Anime { get; set; }

        public int staff_id { get; set; }
        [JsonIgnore]
        public Staff Staff { get; set; }
    }

}
