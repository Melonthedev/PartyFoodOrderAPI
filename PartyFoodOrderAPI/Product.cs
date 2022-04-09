using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace PartyFoodOrderAPI
{
    public class Product
    {

        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public bool IsInStock { get; set; }
        [Required]
        public int Category { get; set; }

        public Product(int id, string name, int category)
        {
            Id = id;
            Name = name;
            Category = category;
            IsInStock = true;
        }

    }
}
