using Microsoft.AspNetCore.Mvc;

namespace PartyFoodOrderAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FoodOrderController : Controller
    {

        private readonly ILogger<FoodOrderController> _logger;

        public FoodOrderController(ILogger<FoodOrderController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetFoodOrder")]
        public string Get()
        {
            _logger.Log(LogLevel.Information, "Request with body: " + Request.Body);
            Console.WriteLine("test");
            return "Hi!";
        }
    }
}
