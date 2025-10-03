using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Comment> Comments { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole{
                    Id = "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                    Name = "Admin",
                    NormalizedName = "ADMIN"

                },
                new IdentityRole{
                    Id = "b2c2a8f0-3c59-4d91-bc11-5a4b934c0c99",
                    Name = "User",
                    NormalizedName = "USER"

                }
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }

}