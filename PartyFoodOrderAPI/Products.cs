namespace PartyFoodOrderAPI
{
    public class Products
    {

        public static List<Product>? AllProducts { get; set; }


        public Products()
        {
            AllProducts = new List<Product>();
        }

        public static void AddProduct(Product product)
        {
            if (AllProducts == null) AllProducts = new List<Product>();
            AllProducts.Add(product);
        }

        public static void RemoveProduct(Product product)
        {
            if (AllProducts == null) AllProducts = new List<Product>();
            AllProducts.Remove(product);
        }

        public static Product? GetProductById(int id) 
        {
            if (AllProducts is null) AllProducts = new List<Product>();
            var index = AllProducts.FindIndex(x => x.Id == id);
            try
            { 
                return AllProducts[index];
            }
            catch (ArgumentOutOfRangeException e)
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
