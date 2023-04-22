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
        public string rating { get; set; }

        // Navigation properties
        public int studio_id { get; set; }
        public Studio Studio { get; set; }
        public ICollection<AnimeGenre> AnimeGenres { get; set; }
        public ICollection<AnimeCharacter> AnimeCharacters { get; set; }
        public ICollection<AnimeStaff> AnimeStaffs { get; set; }


    }

}
