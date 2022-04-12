namespace PartyFoodOrderAPI
{
    public class Products
    {

        public static List<Product>? AllProducts { get; set; }

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

        public static Product GetProductByID(int id) 
        {
            if (AllProducts == null) AllProducts = new List<Product>();
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

        public static string GetCategoryByID(int id)
        {
            switch (id)
            {
                case 1:
                    return "Drink";
                case 2:
                    return "Cake";
                case 3:
                    return "Other";
                default:
                    return "Other";
            }
        }
        public static int GetCategoryID(string category)
        {
            category = category.ToLower();
            switch (category)
            {
                case "drink":
                    return 1;
                case "cake":
                    return 2;
                case "other":
                    return 3;
                default:
                    return 0;
            }
        }
    }
}
