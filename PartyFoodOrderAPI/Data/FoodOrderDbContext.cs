using Microsoft.EntityFrameworkCore;

namespace PartyFoodOrderAPI
{
    public class FoodOrderDbContext : DbContext
    {

        public FoodOrderDbContext(DbContextOptions<FoodOrderDbContext> options) : base(options)
        {
        }

        public DbSet<FoodOrder> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<BurgerOrder> BurgerOrders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FoodOrder>().ToTable("FoodOrder");
            modelBuilder.Entity<Product>().ToTable("Product");
            modelBuilder.Entity<BurgerOrder>().ToTable("BurgerOrder");
        }
    }
}
