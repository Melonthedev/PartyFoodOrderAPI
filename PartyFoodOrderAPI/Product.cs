using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace PartyFoodOrderAPI
{
    public class Product
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; private set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; private set; }
        
        [Required]
        [Range(1, 3)]
        public int Category { get; private set; }

        public bool IsInStock { get; private set; }

        public string? SubCategory { get; private set; }

        public string? Description { get; private set; }

        public string? ImageUrl { get; private set; }

        public bool IsSelfService { get; private set; }

        public List<FoodOrder> FoodOrders { get; private set; }

        public Product(string name, int category, string? subCategory = null, string? description = null, string? imageUrl = null, bool isInStock = true, bool isSelfService = false)
        {
            Name = name;
            Category = category;
            SubCategory = subCategory;
            Description = description;
            ImageUrl = imageUrl;
            IsInStock = isInStock;
            IsSelfService = isSelfService;
        }

        public void SetInStock(bool flag = true)
        {
            IsInStock = flag;
        }
        
        public void Update(string name, int category, string? subCategory, string? description, string? imageUrl, bool isInStock, bool isSelfService)
        {
            Name = name;
            Category = category;
            SubCategory = subCategory;
            Description = description;
            ImageUrl = imageUrl;
            IsInStock = isInStock;
            IsSelfService = isSelfService;
        }
    }
}
