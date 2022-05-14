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
            BurgerExtras extras = await _context.BurgerExtras.FirstOrDefaultAsync(x => x.ConsumerName == consumerName);
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
    }
}
