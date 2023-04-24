using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EADCA2_Anime.Model
{
    public class Genre
    {
        public int genre_id { get; set; }
        [Required]
        public string name { get; set; }
        // Navigation properties
        [JsonIgnore]
        public List<Anime>? Anime { get; set; }
    }

}
