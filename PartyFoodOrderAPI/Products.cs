using PartyFoodOrderAPI.Schemas;
using static PartyFoodOrderAPI.Services.ImageProcessingService;

namespace PartyFoodOrderAPI
{
    public class Products
    {

        public static List<Product> AllProducts { get; set; } = new();

        public static void AddProduct(Product product)
        {
            AllProducts.Add(product);
        }

        public static bool RemoveProduct(Product product)
        {
            AllProducts.Remove(product);
            return true;
        }

        public static Product? GetProductById(int id) 
        {
            var index = AllProducts.FindIndex(x => x.Id == id);
            try
            { 
                return AllProducts[index];
            }
            catch (ArgumentOutOfRangeException)
            {
                return null;
            }
        }

        public static string GetCategoryById(int id)
        {
            return id switch
            {
                1 => "Drink",
                2 => "Cake",
                3 => "Other",
                _ => "Other",
            };
        }
        public static int GetCategoryId(string category)
        {
            return category.ToLower() switch
            {
                "drink" => 1,
                "cake" => 2,
                "other" => 3,
                _ => 0,
            };
        }
    }
}
