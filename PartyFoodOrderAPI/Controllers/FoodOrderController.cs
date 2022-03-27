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
        public ActionResult<List<FoodOrderData>> Get([FromQuery(Name = "method")] string method = "all")
        {
            _logger.Log(LogLevel.Information, "Recived GET Request with QueryMethod: " + method);
            if (method != "all")
                return BadRequest("No valid method query!");
            return Ok(Orders.GetFoodOrders());
        }

        [HttpPost("AddFoodOrder")]
        public ActionResult<string> Post([FromBody] FoodOrderData data)
        {
            Orders.AddFoodOrder(new FoodOrder(DateTimeOffset.UtcNow.ToUnixTimeSeconds(), Orders.GetFoodOrders().Count + 1, data.Product, data.Count, data.Name, data.Comment));
            _logger.Log(LogLevel.Information, $"Recived order: Name:  '{data.Name}', Product: '{data.Product}', Count: {data.Count}");
            return Ok($"{{ \"title\" : \"You placed an order 😃\", \"name\" : \"{data.Name}\", \"product\" : \"{data.Product}\", \"count\" : {data.Count}, \"comment\" : \" {data.Comment} \", \"Mmessage\" : \"Vielen Dank für ihre Bestellung!\"}}");
        }

        [HttpPost("MarkFoodOrderAsFinished")]
        public ActionResult<string> MarkFoodOrderAsFinished([Required][FromQuery(Name = "orderId")] int orderId)
        {
            var order = Orders.GetFoodOrders().FirstOrDefault(foodOrder => foodOrder.GetOrderId() == orderId);
            if (order is null)
                return BadRequest("Bad Request - Found no order for orderId " + orderId);
            order.SetMarkedAsFinished();
            return Ok("Success - Updated MarkedAsFinishedStatus of orderId " + order.OrderId);
        }

        [HttpDelete("DeleteFoodOrder")]
        public ActionResult<string> Delete([Required][FromQuery(Name = "orderId")] int orderId)
        {
            var order = Orders.GetFoodOrders().FirstOrDefault(foodOrder => foodOrder.GetOrderId() == orderId);
            if (order is null)
                return BadRequest("Bad Request - Found no order for orderId " + orderId);
            Orders.DeleteFoodOrder(order);
            return Ok("Success - Deleted FoodOrder with orderId " + order.OrderId);
        }

    }
}
