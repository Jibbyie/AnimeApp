namespace EADCA2_Anime.Model
{
    public class Character
    {
        public int character_id { get; set; }
        public string name { get; set; }
        public string image_url { get; set; }

        public List<AnimeCharacter> AnimeCharacter { get; set; }
    }

}
