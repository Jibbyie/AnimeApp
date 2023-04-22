using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;


namespace EADCA2_Anime.controllers
{
    public class AnimeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AnimeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Anime>>> GetAnimes(string query, string sortBy)
        {
            var animes = _context.Animes.AsQueryable();

            if (!string.IsNullOrEmpty(query))
            {
                animes = animes.Where(a => a.Title.Contains(query));
            }

            if (sortBy == "trending")
            {
                animes = animes.OrderByDescending(a => a.Rating);
            }
            // Implement other sorting options
            // Implement other sorting options
            else if (sortBy == "new")
            {
                animes = animes.OrderByDescending(a => a.Id); // Assuming newer entries have higher IDs
            }
            else if (sortBy == "top10Airing")
            {
                animes = animes.OrderByDescending(a => a.Rating).Take(10); // Assuming top 10 airing animes are based on ratings
            }

            return await animes.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Anime>> GetAnime(int id)
        {
            var anime = await _context.Animes.FindAsync(id);

            if (anime == null)
            {
                return NotFound();
            }

            return anime;
        }

        [HttpPost]
        public async Task<ActionResult<Anime>> PostAnime(Anime anime)
        {
            _context.Animes.Add(anime);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAnime", new { id = anime.Id }, anime);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnime(int id, Anime anime)
        {
            if (id != anime.Id)
            {
                return BadRequest();
            }

            _context.Entry(anime).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnimeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnime(int id)
        {
            var anime = await _context.Animes.FindAsync(id);
            if (anime == null)
            {
                return NotFound();
            }

            _context.Animes.Remove(anime);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnimeExists(int id)
        {
            return _context.Animes.Any(e => e.Id == id);
        }
    }
}