using System.ComponentModel.DataAnnotations;

namespace PartyFoodOrderAPI.Schemas
{
    public class ProductData : IValidatableObject
    {
        [Required]
        [MaxLength(20)]
        public string? Name { get; set; }
        public bool IsInStock { get; set; }
        [Required]
        [Range(1, 3)]
        public int Category { get; set; }

        public string? SubCategory { get; set; }

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public IFormFile? Image { get; set; }

        [Required]
        public string ImageFormat { get; set; }

        public bool IsSelfService { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (ImageFormat is null)
            {
                yield return new ValidationResult("Image format is required");
            }
            if (ImageUrl is null && Image is null)
            {
                yield return new ValidationResult("ImageUrl or Image is required");
            }
            if (ImageUrl is not null && Image is not null)
            {
                yield return new ValidationResult("ImageUrl or Image is required, not both");
            }
        }
    }
}
