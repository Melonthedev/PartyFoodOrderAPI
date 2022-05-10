using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PartyFoodOrderAPI
{
    public class Product
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
        [Required]
        [MaxLength(20)]
        public string Name { get; set; }
        public bool IsInStock { get; set; }
        [Required]
        [Range(1, 3)]
        public int Category { get; set; }

        public string? SubCategory { get; set; }

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public Product(string name, int category, string? subCategory = null, string? description = null, string? imageUrl = null, bool isInStock = true)
        {
            //Id = id;
            Name = name;
            Category = category;
            SubCategory = subCategory;
            Description = description;
            ImageUrl = imageUrl;
            IsInStock = isInStock;
        }
    }
}
