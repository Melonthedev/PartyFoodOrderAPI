
namespace PartyFoodOrderAPI.Data
{

    public class DbInitializer
    {
        public static void Initialize(FoodOrderDbContext context)
        {
            context.Database.EnsureCreated();
            
            if (context.Orders.Any())
            {
                return; // DB has been seeded
            }

            var products = new Product[]
            {
            /*new Product("Cola", 1, "SoftDrink"),
            new Product("Fanta", 1, "SoftDrink"),
            new Product("Sprite", 1, "SoftDrink"),
            new Product("Erdbeerkuchen", 2),
            new Product("Pfannkuchen", 2),
            new Product("Ananas", 3, "Frucht"),
            new Product("Kaffee", 1, "Heißgetränk"),
            new Product("Oreo", 3, "Kekse"),*/
            };
            foreach (Product s in products)
            {
                context.Products.Add(s);
            }
            context.SaveChanges();
        }
    }
}
