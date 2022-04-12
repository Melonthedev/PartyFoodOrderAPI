using System.ComponentModel.DataAnnotations;

namespace PartyFoodOrderAPI
{
    public class FoodOrderData
    {

        [MaxLength(20)]
        [Required] public string Name { get; set; }
        [Required] public string Product { get; set; }

        [Required]
        [Range(1, 4)]
        public int Count { get; set; }

        [MaxLength(150)]
        public string? Comment { get; set; }
    }
}
