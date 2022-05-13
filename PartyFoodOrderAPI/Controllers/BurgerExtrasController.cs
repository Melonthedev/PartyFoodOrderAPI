using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PartyFoodOrderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BurgerExtrasController : ControllerBase
    {

        private Logger<BurgerExtrasController> _logger;
        private FoodOrderDbContext _context;

        public BurgerExtrasController(Logger<BurgerExtrasController> logger, FoodOrderDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        // GET: api/<BurgerExtrasController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "Egg", "Bacon" };
        }

        // POST api/<BurgerExtrasController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] BurgerExtras extras)
        {
            _context.BurgerExtras.Add(extras);
            await _context.SaveChangesAsync();
            return Ok();
        }


    }
}
