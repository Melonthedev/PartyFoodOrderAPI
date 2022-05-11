using Microsoft.AspNetCore.HttpOverrides;
using PartyFoodOrderAPI;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<FoodOrderDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
// Add services to the container.
builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.WebHost.UseUrls("http://62.171.155.162:5000", "http://localhost:5000", "http://127.0.0.1:5000", "https://127.0.0.1:5000");

var app = builder.Build();

//DbStartup.CreateDbIfNotExists(app);

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<FoodOrderDbContext>();
        await context.Database.MigrateAsync();
        //DbInitializer.Initialize(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Use((context, next) =>
{
    context.Request.EnableBuffering();
    return next();
});

app.UseDefaultFiles();
app.UseStaticFiles();

//app.UseHttpsRedirection();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseAuthorization();

app.MapControllers();

app.Run();