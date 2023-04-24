using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EADCA2_Anime.Model
{
    public class Staff
    {
        public int staff_id { get; set; }
        [Required]
        public string name { get; set; }
        public string position { get; set; }
        // Navigation properties
        public int? studio_id { get; set; }
        [JsonIgnore]
        public Studio? Studio { get; set; }
    }

}
