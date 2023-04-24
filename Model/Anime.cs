using System.Text.Json.Serialization;

namespace EADCA2_Anime.Model
{
    public class Anime
    {
        public int anime_id { get; set; }
        public string title { get; set; }
        public string synopsis { get; set; }
        public DateTime start_date { get; set; }
        public DateTime end_date { get; set; }
        public string season { get; set; }
        public int duration { get; set; }
        public Double rating { get; set; }

        // Navigation properties
        public int studio_id { get; set; }
        [JsonIgnore]
        public Studio Studio { get; set; }
        [JsonIgnore]
        public ICollection<AnimeGenre> AnimeGenre { get; set; }
        [JsonIgnore]
        public ICollection<AnimeCharacter> AnimeCharacter { get; set; }
        [JsonIgnore]
        public ICollection<AnimeStaff> AnimeStaff { get; set; }


    }

}
