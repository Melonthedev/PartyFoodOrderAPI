using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace PartyFoodOrderAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class FoodOrderController : Controller
    {
        private readonly ILogger<FoodOrderController> _logger;
        public FoodOrderController(ILogger<FoodOrderController> logger)
        {
            _logger = logger;
        }

        [HttpGet("GetFoodOrder")]
        public ActionResult<List<FoodOrderData>> Get([FromQuery] string method = "all", [FromQuery] int id = 0)
        {
            _logger.LogInformation($"Recived GET Request: Getting {(method == "all" ? "all FoodOrders" : "a FoodOrder with id " + id)}");
            return method switch
            {
                "all" => Ok(Orders.GetFoodOrders()),
                "id" => Ok(Orders.GetFoodOrderById(id)),
                _ => BadRequest("Invalid QueryMethod"),
            };
        }

        [HttpPost("AddFoodOrder")]
        public ActionResult<string> Post([Required][FromBody] FoodOrderData data)
        {
            _logger.LogInformation($"Recived GET Request: Adding a FoodOrder with data: name: {data.Name}, product: {data.Product}, count: {data.Count}, comment: {data.Comment}");
            var comment = data.Comment != null ?  data.Comment.Replace("\n", " ¬ ") : "";
            var order = new FoodOrder(DateTimeOffset.UtcNow.ToUnixTimeSeconds(), Orders.GetFoodOrders().Count + 1, data.Product, data.Count, data.Name, comment);
            Orders.AddFoodOrder(order);
            return Ok($"{{ \"title\" : \"You placed an order 😃\", \"name\" : \"{data.Name}\", \"productId\" : \"{data.Product}\", \"product\" : \"{data.Product.Name}\", \"count\" : {data.Count}, \"comment\" : \" {comment} \", \"message\" : \"Vielen Dank für deine Bestellung!\"}}");
        }

        [HttpPost("MarkFoodOrderAsFinished")]
        public ActionResult<string> MarkFoodOrderAsFinished([Required][FromQuery] int orderId)
        {
            _logger.LogInformation($"Recived POST Request: Marking FoodOrder with id {orderId} as finished");
            var order = Orders.GetFoodOrders().FirstOrDefault(foodOrder => foodOrder.GetOrderId() == orderId);
            if (order is null)
                return NotFound($"No order with id {orderId} found");
            order.SetMarkedAsFinished();
            return Ok("Updated MarkedAsFinishedStatus of orderId " + order.Id);
        }

        [HttpDelete("DeleteFoodOrder")]
        public ActionResult<string> Delete([Required][FromQuery] int orderId)
        {
            _logger.LogInformation($"Recived DELETE Request: Deleting FoodOrder with id {orderId}");
            var order = Orders.GetFoodOrders().FirstOrDefault(foodOrder => foodOrder.GetOrderId() == orderId);
            if (order is null)
                return NotFound($"No order with id {orderId} found");
            Orders.DeleteFoodOrder(order);
            return Ok("Deleted FoodOrder with id " + order.Id);
        }

    }
}
