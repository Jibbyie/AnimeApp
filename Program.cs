using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Configuration;
using Npgsql.EntityFrameworkCore;

namespace MyNamespace
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateHostBuilder(string[] args) =>
            new WebHostBuilder()
                .UseKestrel()
                .UseUrls("http://*")
                .UseStartup<Startup>();
    }

    public class Startup
    {
        public static IConfiguration Configuration { get; private set; }
        public void ConfigureServices(IServiceCollection services)
        {
            Configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            services.AddDbContext<AnimeDbContext>(options =>
            options.UseNpgsql(Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING")));
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.Use(async (context, next) =>
            {
                var remoteIp = context.Connection.RemoteIpAddress;

                // Allow access if the request is coming from your IP address
                var remoteIpAddresses = Configuration.GetSection("RemoteIpAdresses").Get<string[]>();

                if (context.Request.Path.StartsWithSegments("/swagger") && !remoteIpAddresses.Contains(remoteIp.ToString()))
                {
                    context.Response.StatusCode = 403;
                    await context.Response.WriteAsync("Access denied to Swagger.");
                }
                else
                {
                    await next();
                }
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

    }
}