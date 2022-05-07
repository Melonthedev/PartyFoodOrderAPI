using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace PartyFoodOrderAPI
{
    public class FoodOrderDbContext : DbContext
    {

        public FoodOrderDbContext(DbContextOptions<FoodOrderDbContext> options) : base(options)
        {
        }

        public DbSet<FoodOrder> Orders { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FoodOrder>().ToTable("FoodOrder");
            modelBuilder.Entity<Product>().ToTable("Product");
        }
    }
}
