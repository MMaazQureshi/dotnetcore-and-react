using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using Data;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host =  CreateHostBuilder(args).Build();
        //    .Run();
        using(var scope = host.Services.CreateScope()){
            var Services = scope.ServiceProvider;
            try{
                var context = Services.GetRequiredService<DataContext>();
                context.Database.Migrate();
            }
            catch (Exception ex){
                var Logger=Services.GetRequiredService<ILogger<Program>>();
                Logger.LogError(ex,"An error occured during Migration");
            }
        }
        host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
