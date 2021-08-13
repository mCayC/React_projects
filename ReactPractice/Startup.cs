using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SimpleModelsAndRelations.Models;



namespace SimpleModelsAndRelations
{
    public class ApiOptions
    {
        public ApiOptions() { }
        public string ApiToken { get; set; }
    }

    public class ProjectNameOptions
    {
        public ProjectNameOptions() { }
        public string Value { get; set; }
    }

    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<SimpleModelsAndRelationsContext>(options =>
            {
                options.UseNpgsql("User ID=postgres;Password=password;Host=localhost;Port=5432;Database=Webshop;Pooling=true;");
            });
            services.AddMvc()
              .AddJsonOptions(opts => opts.JsonSerializerOptions.PropertyNamingPolicy = null);
              
            services.AddControllersWithViews();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IOptions<ApiOptions> apiOptionsAccessor, IHostingEnvironment env, ILoggerFactory loggerFactory, SimpleModelsAndRelationsContext dbContext, IAntiforgery antiforgery)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

            }
            else
            {
                //app.UseMiddleware(typeof(ErrorHandling));
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
                       {
                           endpoints.MapControllerRoute(
                               name: "default",
                               pattern: "{controller=Home}/{action=Index}/{id?}");
                       });
        }

        public static void KeepAlive()
        {
            while (true)
            {
                Thread.Sleep(TimeSpan.FromSeconds(10));
                Console.WriteLine("KEEP-ALIVE");
            }
        }
    }
}