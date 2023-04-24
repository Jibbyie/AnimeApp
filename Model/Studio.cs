using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EADCA2_Anime.Model
{
    public class Studio
    {
        public int studio_id { get; set; }
        [Required]
        public string name { get; set; }
        // Navigation properties
        [JsonIgnore]
        public List<Anime>? Anime { get; set; }
        [JsonIgnore]
        public List<Staff>? Staff { get; set; }
    }

}
