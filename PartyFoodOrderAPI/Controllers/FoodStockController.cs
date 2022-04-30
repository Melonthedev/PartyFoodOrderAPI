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
            _logger.LogInformation("Recived GET Request: Getting a list of all products");
            return Ok(Products.AllProducts);
        }

        [HttpGet("GetProduct")]
        public ActionResult<Product> GetProduct([Required][FromQuery] int id)
        {
            _logger.LogInformation("Recived GET Request: Getting product with id: " + id);
            return Ok(Products.AllProducts.Find(p => p.Id == id));
        }

        [HttpGet("GetAllProducts/{categoryId}")]
        public ActionResult<List<Product>> GetAllProducts([Required][FromRoute] int categoryId)
        {
            _logger.LogInformation($"Recived GET Request: Getting a list of all products in a category named {Products.GetCategoryById(categoryId)}");
            return Ok(Products.AllProducts.Where(p => p.Category == categoryId).ToList());
        }

        [HttpGet("GetNextId")]
        public ActionResult<int> GetNextId()
        {
            try
            {
                return Ok(Products.AllProducts.Aggregate((agg, next) =>
                                next.Id >= agg.Id ? next : agg).Id + 1);
            }
            catch (InvalidOperationException)
            {
                return Ok(1);
            }
        }

        [HttpGet("IsProductInStock/{productId}")]
        public ActionResult<bool> GetIsProductInStock([Required][FromRoute] int productId)
        {
            _logger.LogInformation($"Recived GET Request: Checking if product with id {productId} is in stock");
            var product = Products.GetProductById(productId);
            return product is null ? NotFound($"No product with id {productId} found") : Ok(product.IsInStock);
        }

        [HttpPost("SetProductInStock/{flag}")]
        public ActionResult SetIsProductInStock([Required][FromQuery] int productId, [Required][FromRoute] bool flag = true)
        {
            _logger.LogInformation($"Recived POST Request: Set if product with id {productId} is in stock");
            var product = Products.GetProductById(productId);
            return product is null ? NotFound($"No product with id {productId} found") : Ok(product.IsInStock = flag);
        }
        
        [HttpPost("AddProduct")]
        public ActionResult AddProduct([Required][FromBody] Product product)
        {
            _logger.LogInformation($"Recived POST Request: Adding a new product with name: {product.Name} and category: {product.Category} and description: \"{product.Description}\"");
            if (Products.AllProducts.Find(pr => pr.Id == product.Id) != null)
            {
                return Conflict("Product with this ID already exists!");
            }
            Products.AddProduct(product);
            return Ok();
        }

        [HttpDelete("DeleteProduct")]
        public ActionResult DeleteProduct([Required][FromQuery] int productId)
        {
            _logger.LogInformation($"Recived DELETE Request: Deleting a product with id: {productId}");
            var product = Products.GetProductById(productId);
            return product is null ? NotFound($"No product with id {productId} found") : Ok(Products.RemoveProduct(product));
        }

        [HttpPatch("UpdateProduct")]
        public ActionResult UpdateProduct([Required][FromQuery] int id, [Required][FromBody] Product newProduct)
        {
            _logger.LogInformation($"Recived PATCH Request: Updating product with id: {id}");
            var oldProduct = Products.GetProductById(id);
            if (oldProduct is null) 
                return NotFound($"No product with id {id} found");
            return Products.UpdateProduct(id, newProduct) ? Ok() : Conflict("Product with new ID already exists!");
        }
    }
}
