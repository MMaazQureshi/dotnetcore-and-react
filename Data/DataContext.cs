using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions options ):base(options)
        {
            
        }
        public DbSet<Value> values{ get; set; }
        public DbSet<Activity> Activities{ get; set; }
        protected override void OnModelCreating(ModelBuilder builder){
            builder.Entity<Value>().HasData(
                new Value{Id =1,value="Value 101"},
                new Value{Id =2,value="Value 102"},
                new Value{Id =3,value="Value 103"}

        );
        }
    }
}
