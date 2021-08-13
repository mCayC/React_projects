using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace SimpleModelsAndRelations
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((ctx, config) =>
                    config.SetBasePath(ctx.HostingEnvironment.ContentRootPath)
                    .AddCommandLine(args)
                    .AddEnvironmentVariables(prefix: "ASPNETCORE_"))
                .UseStartup<Startup>()
                .UseUrls("http://*:5000")
                .Build();
    }
}
