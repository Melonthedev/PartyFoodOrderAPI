using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PartyFoodOrderAPI.Schemas
{
    public class ProductData
    {
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

    }
}
