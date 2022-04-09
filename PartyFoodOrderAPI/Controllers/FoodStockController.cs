using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace PartyFoodOrderAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodStockController : Controller
    {
        private readonly ILogger<FoodStockController> _logger;

        public FoodStockController(ILogger<FoodStockController> logger)
        {
            _logger = logger;
        }

        [HttpGet("GetAllProducts")]
        public ActionResult<List<Product>> GetAllProducts()
        {
            _logger.Log(LogLevel.Information, "Recived GET Request: Getting a list of all products");
            return Ok(Products.AllProducts);
        }

        [HttpGet("GetAllProducts/{category}")]
        public ActionResult<List<Product>> GetAllProducts([Required][FromRoute] string category)
        {
            int categoryId = Products.GetCategoryID(category);
            _logger.Log(LogLevel.Information, "Recived GET Request: Getting a list of all products in a category");
            IEnumerator<Product> enumerator = Products.AllProducts.Where(p => p.Category == categoryId).GetEnumerator();
            List<Product> products = new List<Product>();
            while (enumerator.MoveNext())
            {
                products.Add(enumerator.Current);
            }
            return Ok(products);
        }

        [HttpGet("IsProductInStock/{productId}")]
        public ActionResult<bool> GetIsProductInStock([FromRoute] int productId)
        {
            _logger.Log(LogLevel.Information, "Recived GET Request: Checking if product is in stock");
            return Ok(Products.GetProductByID(productId).IsInStock);
        }

        [HttpPost("AddProduct")]
        public ActionResult AddProduct([Required][FromBody] Product product)
        {
            _logger.Log(LogLevel.Information, "Recived POST Request: Adding a new product with name: {0} and category: {1}", product.Name, product.Category);
            if (product.Category == 0 || product.Category > 3 || product.Id == 0)
            {
                return BadRequest("Category or ID is not valid! Can't be 0 and Category must be between 1 and 3");
            }
            if (Products.AllProducts == null) Products.AllProducts = new List<Product>();
            if (Products.AllProducts.Find(pr => pr.Id == product.Id) != null)
            {
                return BadRequest("Product with this ID already exists!");
            }
            Products.AddProduct(product);
            return Ok();
        }

        [HttpDelete("DeleteProduct")]
        public ActionResult DeleteProduct([Required][FromQuery] int id)
        {
            _logger.Log(LogLevel.Information, "Recived DELETE Request: Deleting a product with id: {0}", id);
            Products.RemoveProduct(Products.GetProductByID(id));
            return Ok();
        }
    }
}
