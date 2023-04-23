using EADCA2_Anime.Controllers;
using EADCA2_Anime.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EADCA2_Anime.Controllers
{
    public abstract class CrudController<TContext, TEntity, TKey> : ControllerBase
        where TContext : DbContext
        where TEntity : class
    {
        private readonly TContext _context;

        public CrudController(TContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TEntity>>> Get()
        {
            return await _context.Set<TEntity>().ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TEntity>> Get(int id)
        {
            var entity = await _context.Set<TEntity>().FindAsync(GetEntityId(id));

            if (entity == null)
            {
                return NotFound();
            }

            return entity;
        }

        [HttpPost]
        public async Task<ActionResult<TEntity>> Post(TEntity entity)
        {
            _context.Set<TEntity>().Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = GetEntityId(entity) }, entity);
        }

        [HttpPut("{id}")]
  public async Task<IActionResult> Put(int id, TEntity entity)
{
    var existingEntity = await _context.Set<TEntity>().FindAsync(GetEntityId(entity));

    if (existingEntity == null)
    {
        return NotFound();
    }

    if (!AreKeysEqual(GetEntityId(existingEntity), id))
    {
        return BadRequest();
    }

    _context.Entry(existingEntity).State = EntityState.Detached;
    _context.Entry(entity).State = EntityState.Modified;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!EntityExists(id))
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
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _context.Set<TEntity>().FindAsync(GetEntityId(id));
            if (entity == null)
            {
                return NotFound();
            }

            _context.Set<TEntity>().Remove(entity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AreKeysEqual(TKey key1, int key2)
        {
            if (typeof(TKey) == typeof(int))
            {
                // If TKey is int, just compare the values
                return EqualityComparer<TKey>.Default.Equals(key1, (TKey)(object)key2);
            }
            else if (typeof(TKey) == typeof(ValueTuple<int, int>))
            {
                // If TKey is a tuple of ints, compare both values in the tuple
                var tupleKey = (ValueTuple<int, int>)(object)key1;
                return tupleKey.Item1 == key2 || tupleKey.Item2 == key2;
            }
            else
            {
                // Handle other TKey types here
                throw new NotSupportedException($"Type {typeof(TKey)} is not supported for this comparison method.");
            }
        }


        protected abstract bool EntityExists(int id);

        protected abstract TKey GetEntityId(TEntity entity);

        protected abstract TKey GetEntityId(int id);
    }
}


[ApiController]
[Route("api/[controller]")]
public class GenreController : CrudController<AnimeDbContext, Genre, int>
{
    public GenreController(AnimeDbContext context) : base(context)
    {
    }

    protected override bool EntityExists(int id)
    {
        throw new NotImplementedException();
    }

    protected override int GetEntityId(Genre genre)
    {
        return genre.genre_id;
    }

    protected override int GetEntityId(int id)
    {
        return id;
    }
}

[ApiController]
[Route("[controller]")]
public class AnimeController : CrudController<AnimeDbContext, Anime, int>
{
    public AnimeController(AnimeDbContext context) : base(context) { }

    protected override int GetEntityId(Anime entity)
    {
        return entity.anime_id;
    }

    protected override bool EntityExists(int id)
    {
        throw new NotImplementedException();
    }

    protected override int GetEntityId(int id)
    {
        return id;
    }
}

[ApiController]
[Route("[controller]")]
public class StudioController : CrudController<AnimeDbContext, Studio, int>
{
    public StudioController(AnimeDbContext context) : base(context) { }

    protected override int GetEntityId(Studio entity)
    {
        return entity.studio_id;
    }

    protected override bool EntityExists(int id)
    {
        throw new NotImplementedException();
    }

    protected override int GetEntityId(int id)
    {
        return id;
    }
}


[ApiController]
[Route("[controller]")]
public class AnimeGenreController : CrudController<AnimeDbContext, AnimeGenre, (int, int)>
{
    public AnimeGenreController(AnimeDbContext context) : base(context) { }

    protected override (int, int) GetEntityId(AnimeGenre entity)
    {
        return (entity.anime_id, entity.genre_id);
    }

    protected override bool EntityExists(int id)
    {
        throw new NotImplementedException();
    }

    protected override (int, int) GetEntityId(int id)
    {
        throw new NotImplementedException();
    }
}