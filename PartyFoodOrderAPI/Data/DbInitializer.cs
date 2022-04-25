using System;
using System.Linq;

namespace PartyFoodOrderAPI.Data
{

    public class DbInitializer
    {
        public static void Initialize(FoodOrderDbContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Orders.Any())
            {
                return;   // DB has been seeded
            }

            var products = new Product[]
            {
            new Product(1, "Cola", 1, "SoftDrink"),
            new Product(2, "Fanta", 1, "SoftDrink"),
            new Product(3, "Sprite", 1, "SoftDrink"),
            new Product(4, "Erdbeerkuchen", 2),
            new Product(5, "Pfannkuchen", 2),
            new Product(6, "Ananas", 3, "Frucht"),
            new Product(7, "Kaffee", 1, "Heißgetränk"),
            new Product(8, "Oreo", 3, "Kekse"),
            };
            foreach (Product s in products)
            {
                context.Products.Add(s);
            }
            context.SaveChanges();
    
        
        }
    }
}
