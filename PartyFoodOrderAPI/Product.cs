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

        [Required]
        public bool IsInStock { get; private set; }

        [Required]
        public string? SubCategory { get; private set; }

        [Required]
        public string? Description { get; private set; }

        [Required]
        public string? ImageUrl { get; private set; }

        //public byte[]? Image { get; private set; }
        //public string ImageHeader { get; private set; }

        [Required]
        public bool IsSelfService { get; private set; }

        public List<FoodOrder>? FoodOrders { get; set; }
        //public List<ProductImage>? ProductImages { get; set; }

        public Product(string name, int category, string? subCategory = null, string? description = null, bool isInStock = true, bool isSelfService = false, string imageUrl = null)
        {
            Name = name;
            Category = category;
            SubCategory = subCategory;
            Description = description;
            IsInStock = isInStock;
            IsSelfService = isSelfService;
            ImageUrl = imageUrl;
        }

        public void SetInStock(bool flag = true)
        {
            IsInStock = flag;
        }

        public void Update(string name, int category, string? subCategory, string? description, bool isInStock, bool isSelfService, string imageUrl)
        {
            Name = name;
            Category = category;
            SubCategory = subCategory;
            Description = description;
            IsInStock = isInStock;
            IsSelfService = isSelfService;
            ImageUrl = imageUrl;
        }
    }
}