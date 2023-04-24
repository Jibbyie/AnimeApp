using System.Text.Json.Serialization;

namespace EADCA2_Anime.Model
{
    public class Staff
    {
        public int staff_id { get; set; }
        public string name { get; set; }
        public string position { get; set; }
        [JsonIgnore]
        public List<AnimeStaff> AnimeStaff { get; set; }
    }

}
