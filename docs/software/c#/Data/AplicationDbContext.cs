using Microsoft.EntityFrameworkCore;
using System.Data;
using DB.Model;


namespace DB.Data
{
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<role> Roles { get; set; }
    }
}
