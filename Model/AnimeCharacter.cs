namespace EADCA2_Anime.Model
{
    public class AnimeCharacter
    {
        public int anime_id { get; set; }
        public Anime Anime { get; set; }

        public int character_id { get; set; }
        public Character Character { get; set; }
    }


}
