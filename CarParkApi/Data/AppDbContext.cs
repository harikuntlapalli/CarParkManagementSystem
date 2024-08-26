// Data/AppDbContext.cs
using Microsoft.EntityFrameworkCore;
using CarParkApi.Models;

namespace CarParkApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Car> Cars { get; set; }
    }
}
