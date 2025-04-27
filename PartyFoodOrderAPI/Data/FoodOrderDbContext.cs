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
        public DbSet<BurgerExtras> BurgerExtras { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FoodOrder>(b =>
            {
                b.ToTable("FoodOrder");
                b.Property(x => x.Id).ValueGeneratedOnAdd();
                b.Property(x => x.OrderedProductId).IsRequired();
                b.Property(x => x.MarkedAsFinished).IsRequired();
                b.Property(x => x.Comment);
                b.Property(x => x.CreatedAt).IsRequired();
                b.Property(x => x.ConsumerName).IsRequired();
                b.Property(x => x.Count).IsRequired();

            });
            modelBuilder.Entity<Product>(b =>
            {
                b.ToTable("Product");
                b.Property(p => p.Id).ValueGeneratedOnAdd();
                b.Property(p => p.Name).IsRequired();
                b.Property(p => p.Description);
                b.Property(p => p.Image);
                b.Property(p => p.ImageHeader);
                b.Property(p => p.SubCategory);
                b.Property(p => p.Category).IsRequired();
                b.Property(p => p.IsInStock).IsRequired();
                b.Property(p => p.IsSelfService).IsRequired();
                b.HasMany(p => p.FoodOrders)
                    .WithOne(o => o.OrderedProduct)
                    .HasForeignKey(o => o.OrderedProductId);
            });
            modelBuilder.Entity<BurgerExtras>(b =>
            {
                b.ToTable("BurgerExtras");
                b.Property(p => p.Id).ValueGeneratedOnAdd();
                b.Property(p => p.ConsumerName).IsRequired();
                b.Property(p => p.Egg).IsRequired();
                b.Property(p => p.Bacon).IsRequired();
            });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.EnableSensitiveDataLogging();
        }
    }
}
