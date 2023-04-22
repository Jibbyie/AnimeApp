namespace EADCA2_Anime.Model
{
    public class AnimeStaff
    {
        public int anime_id { get; set; }
        public Anime Anime { get; set; }

        public int staff_id { get; set; }
        public Staff Staff { get; set; }
    }

}
