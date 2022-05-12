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
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FoodOrder>(b =>
            {
                b.ToTable("FoodOrder");
                b.Property(x => x.Id).ValueGeneratedOnAdd();
                b.Property(x => x.OrderedProductId).IsRequired();
                b.Property(x => x.MarkedAsFinished).IsRequired();
                b.Property(x => x.Comment).IsRequired();
                b.Property(x => x.CreatedAt).IsRequired();
                b.Property(x => x.ConsumerName).IsRequired();
                b.Property(x => x.Count).IsRequired();

            });
            modelBuilder.Entity<Product>(b =>
            {
                b.ToTable("Product");
                b.Property(p => p.Id).ValueGeneratedOnAdd();
                b.Property(p => p.Name).IsRequired();
                b.Property(p => p.Description).IsRequired();
                b.Property(p => p.ImageUrl).IsRequired();
                b.Property(p => p.Category).IsRequired();
                b.Property(p => p.SubCategory).IsRequired();
                b.Property(p => p.IsInStock).IsRequired();
                b.Property(p => p.IsSelfService).IsRequired();
                b.HasMany(p => p.FoodOrders)
                    .WithOne(o => o.OrderedProduct)
                    .HasForeignKey(o => o.OrderedProductId);
            });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }
    }
}
