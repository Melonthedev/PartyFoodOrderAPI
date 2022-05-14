using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace PartyFoodOrderAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class FoodOrderController : Controller
    {
        private readonly ILogger<FoodOrderController> _logger;
        private readonly FoodOrderDbContext _context;
        public FoodOrderController(ILogger<FoodOrderController> logger, FoodOrderDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet("GetFoodOrder")]
        public async Task<ActionResult<IEnumerable<FoodOrder>>> Get([FromQuery] string method = "all", [FromQuery] int id = 0)
        {
            _logger.LogInformation($"Recived GET Request: Getting {(method == "all" ? "all FoodOrders" : "a FoodOrder with id " + id)}");
            return method switch
            {
                "all" => Ok(await _context.Orders.Include(o => o.OrderedProduct).ToListAsync()),
                "id" => Ok(await _context.Orders.Include(o => o.OrderedProduct).FirstOrDefaultAsync(x => x.Id == id)),
                _ => BadRequest("Invalid QueryMethod"),
            };
        }

        [HttpPost("AddFoodOrder")]
        public async Task<ActionResult<string>> Post([Required][FromBody] FoodOrderData data)
        {
            _logger.LogInformation($"Recived GET Request: Adding a FoodOrder with data: name: {data.Name}, product: {data.Product}, count: {data.Count}, comment: {data.Comment}");
            var comment = data.Comment != null ?  data.Comment.Replace("\n", " ¬ ") : "";
            var order = new FoodOrder(DateTime.UtcNow, data.Product, data.Count, data.Name, comment);
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            var prod =  await _context.Products.FindAsync(order.OrderedProductId);
            SMSHelper.SendSMS("+4915238730463", $"Bestellung von {order.ConsumerName} erhalten - Produkt: {order.Count}x {prod.Name}, Kommentar: {order.Comment}");
            return Ok($"{{ \"title\" : \"You placed an order 😃\", \"name\" : \"{data.Name}\", \"productId\" : \"{data.Product}\", \"product\" : \"{prod.Name}\", \"count\" : {data.Count}, \"comment\" : \" {comment} \", \"message\" : \"Vielen Dank für deine Bestellung!\"}}");
        }

        [HttpPost("MarkFoodOrderAsFinished")]
        public async Task<ActionResult<string>> MarkFoodOrderAsFinished([Required][FromQuery] int orderId)
        {
            _logger.LogInformation($"Recived POST Request: Marking FoodOrder with id {orderId} as finished");
            var order = await _context.Orders.FindAsync(orderId);
            if (order is null)
                return NotFound($"No order with id {orderId} found");
            order.SetMarkedAsFinished();
            await _context.SaveChangesAsync();
            return Ok("Updated MarkedAsFinishedStatus of orderId " + order.Id);
        }

        [HttpDelete("DeleteFoodOrder")]
        public async Task<ActionResult<string>> Delete([Required][FromQuery] int orderId)
        {
            _logger.LogInformation($"Recived DELETE Request: Deleting FoodOrder with id {orderId}");
            var order = await _context.Orders.FindAsync(orderId);
            if (order is null)
                return NotFound($"No order with id {orderId} found");
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return Ok("Deleted FoodOrder with id " + order.Id);
        }

    }
}
