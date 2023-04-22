namespace EADCA2_Anime.Model
{
    public class Staff
    {
        public int staff_id { get; set; }
        public string name { get; set; }
        public string position { get; set; }

        public List<AnimeStaff> AnimeStaffs { get; set; }
    }

}
