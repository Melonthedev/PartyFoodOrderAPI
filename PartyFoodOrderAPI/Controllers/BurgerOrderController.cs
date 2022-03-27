using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace PartyFoodOrderAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BurgerOrderController : Controller
    {

        private readonly ILogger<BurgerOrderController> _logger;

        public BurgerOrderController(ILogger<BurgerOrderController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetBurgerOrder")]
        public async Task<string> Get()
        {
            HttpContext.Request.EnableBuffering();
            var result = await HttpContext.Request.BodyReader.ReadAsync();
            var buffer = result.Buffer;
            _logger.Log(LogLevel.Information, "Burger GET Request with body: " + Encoding.Default.GetString(buffer.FirstSpan));
            HttpContext.Request.BodyReader.AdvanceTo(buffer.End);
            //Response.Headers.Add("Access-Control-Allow-Origin", "*");
            return "200 Sucess - BurgerOrder, Methode: GET";
        }

        [HttpPost(Name = "PostBurgerOrder")]
        public async Task<string> Post()
        {
            HttpContext.Request.EnableBuffering();
            var result = await HttpContext.Request.BodyReader.ReadAsync();
            var buffer = result.Buffer;
            _logger.Log(LogLevel.Information, "Burger POST Request with body: " + Encoding.Default.GetString(buffer.FirstSpan));
            HttpContext.Request.BodyReader.AdvanceTo(buffer.End);
            return "200 Sucess - BurgerOrder, Methode: POST";
        }
    }
}
