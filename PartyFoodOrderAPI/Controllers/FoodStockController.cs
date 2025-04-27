using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PartyFoodOrderAPI.Schemas;
using PartyFoodOrderAPI.Services;
using static PartyFoodOrderAPI.Services.ImageProcessingService;

namespace PartyFoodOrderAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodStockController : Controller
    {
        private readonly ILogger<FoodStockController> _logger;
        private readonly FoodOrderDbContext _context;
        private readonly UploadService _uploadService;

        public FoodStockController(ILogger<FoodStockController> logger, FoodOrderDbContext context, UploadService uploadService)
        {
            _logger = logger;
            _context = context;
            _uploadService = uploadService;
        }

        [HttpGet("GetAllProducts")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts()
        {
            _logger.LogInformation("Recived GET Request: Getting a list of all products");
            return Ok(await _context.Products.ToListAsync());
        }
        
        [HttpGet("GetProduct")]
        public async Task<ActionResult<Product>> GetProduct([Required][FromQuery] int id)
        {
            _logger.LogInformation("Recived GET Request: Getting product with id: " + id);
            return Ok(await _context.Products.FindAsync(id));
        }

        [HttpGet("GetAllProducts/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts([Required][FromRoute] int categoryId)
        {
            _logger.LogInformation($"Recived GET Request: Getting a list of all products in a category named {Products.GetCategoryById(categoryId)}");
            return Ok(await _context.Products.Where(p => p.Category == categoryId).ToListAsync());
        }

        [HttpGet("IsProductInStock/{productId}")]
        public async Task<ActionResult<bool>> GetIsProductInStock([Required][FromRoute] int productId)
        {
            _logger.LogInformation($"Recived GET Request: Checking if product with id {productId} is in stock");
            var product = await _context.Products.FindAsync(productId);
            return product is null ? NotFound($"No product with id {productId} found") : Ok(product.IsInStock);
        }

        [HttpPost("SetProductInStock/{flag}")]
        public async Task<ActionResult> SetIsProductInStock([Required][FromQuery] int productId, [Required][FromRoute] bool flag = true)
        {
            _logger.LogInformation($"Recived POST Request: Set if product with id {productId} is in stock");
            var product = await _context.Products.FindAsync(productId);
            if (product is null)
                return NotFound($"No product with id {productId} found");
            product.SetInStock(flag);
            await _context.SaveChangesAsync();
            return Ok();
        }
        
        [HttpPost("AddProduct")]
        public async Task<ActionResult> AddProduct([Required][FromBody] ProductData product)
        {
            //(Status, byte[], string) result = await ImageProcessingService.ProcessImageStreamAsync(product);
            //if (result.Item1 != Status.Success) return BadRequest();

            string imageUrl;

            if (product.ImageUrl is not null) {
                imageUrl = product.ImageUrl;
            } else {
                ValidationResult result = product.Validate(new ValidationContext(product)).First();
                if (result != ValidationResult.Success) {
                    return BadRequest(result.ErrorMessage);
                }
                imageUrl = await _uploadService.UploadFile(product.Image);
            }
            

            _context.Products.Add(new Product(
                                    product.Name, 
                                    product.Category, 
                                    product.SubCategory, 
                                    product.Description, 
                                    product.IsInStock, 
                                    product.IsSelfService,
                                    imageUrl));
            await _context.SaveChangesAsync();
            return Ok();
        }
        
        [HttpDelete("DeleteProduct")]
        public async Task<ActionResult> DeleteProduct([Required][FromQuery] int productId)
        {
            _logger.LogInformation($"Recived DELETE Request: Deleting a product with id: {productId}");
            var product = await _context.Products.FindAsync(productId);
            if (product is null)
                return NotFound($"No product with id {productId} found");
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPatch("UpdateProduct")]
        public async Task<ActionResult> UpdateProduct([Required][FromQuery] int id, [Required][FromBody] ProductData newProduct)
        {
            _logger.LogInformation($"Recived PATCH Request: Updating product with id: {id}");
            var product = await _context.Products.FindAsync(id);
            if (product is null) 
                return NotFound($"No product with id {id} found");
            (Status, byte[], string) result = await ImageProcessingService.ProcessImageStreamAsync(newProduct);
            if (result.Item1 != Status.Success) return BadRequest();
            product.Update(
                newProduct.Name, 
                newProduct.Category, 
                newProduct.SubCategory, 
                newProduct.Description, 
                newProduct.IsInStock, 
                newProduct.IsSelfService, 
                result.Item2);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
