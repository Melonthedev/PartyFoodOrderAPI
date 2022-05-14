using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace PartyFoodOrderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BurgerExtrasController : ControllerBase
    {
        private FoodOrderDbContext _context;

        public BurgerExtrasController(FoodOrderDbContext context)
        {
            _context = context;
        }

        [HttpGet("Get")]
        public async Task<ActionResult<BurgerExtras>> Get([Required][FromQuery] string consumerName)
        {
            var extras = await _context.BurgerExtras.FirstOrDefaultAsync(x => x.ConsumerName == consumerName);
            if (extras == null)
                return NotFound();
            return Ok(extras);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<BurgerExtras>>> GetAll()
        {
            List<BurgerExtras> extras = await _context.BurgerExtras.ToListAsync();
            return Ok(extras);
        }

        [HttpPost("Choose")]
        public async Task<ActionResult> Post([Required][FromBody] BurgerExtras extras)
        {
            _context.BurgerExtras.Add(extras);
            await _context.SaveChangesAsync();
            return Ok();
        }
        
        [HttpDelete("Delete")]
        public async Task<ActionResult> Delete([Required][FromQuery] int id)
        {
            //var extras = await _context.BurgerExtras.FirstOrDefaultAsync(x => x.ConsumerName == consumerName);
            var extras = await _context.BurgerExtras.FindAsync(id);
            if (extras == null)
                return NotFound();
            _context.BurgerExtras.Remove(extras);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpDelete("DeleteAll")]
        public async Task<ActionResult> DeleteAll()
        {
            //var extras = await _context.BurgerExtras.FirstOrDefaultAsync(x => x.ConsumerName == consumerName);
            var extras = await _context.BurgerExtras.ToListAsync();
            foreach (var item in extras)
            {
                _context.BurgerExtras.Remove(item);
            }
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
