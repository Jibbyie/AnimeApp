using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EADCA2_Anime.Model
{
    public class Character
    {
        public int character_id { get; set; }
        [Required]
        public string name { get; set; }
        public string image_url { get; set; }
        public int? anime_id { get; set; }
        // Navigation properties
        [JsonIgnore]
        public Anime Anime { get; set; }

    }

}
