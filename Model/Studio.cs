namespace EADCA2_Anime.Model
{
    public class Studio
    {
        public int studio_id { get; set; }
        public string name { get; set; }

        public List<Anime> Anime { get; set; }
    }

}
