using ValiantTemplate;
using ValiantTemplate.API;
using ValiantTemplate.Database;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Serilog.Events;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseSerilog((context, configuration) =>
    {
        configuration.ReadFrom.Configuration(context.Configuration);
        configuration.MinimumLevel.Debug();
        configuration.MinimumLevel.Override("System", LogEventLevel.Warning);
        configuration.MinimumLevel.Override("Microsoft", LogEventLevel.Warning);
        configuration.MinimumLevel.Override("Microsoft.Hosting.Lifetime", LogEventLevel.Information);
        configuration.MinimumLevel.Override("Microsoft.EntityFrameworkCore.Database.Command", LogEventLevel.Warning);
        configuration.WriteTo.Console();
    });

    var connectionString = builder.Configuration.GetConnectionString("Main");
    if (string.IsNullOrEmpty(connectionString))
    {
        Log.Error("Main connection string is not configured. Application must exit.");
        return;
    }

    builder.Services.AddSwagger();

    builder.Services.AddCors();

    builder.Services.AddDataProtection().PersistKeysToDbContext<DataProtectionDbContext>();

    builder.Services.AddDbContext<ApplicationDbContext>(x => x.UseSqlite(connectionString));
    builder.Services.AddDbContext<DataProtectionDbContext>(x => x.UseSqlite(connectionString));

    builder.Services.AddCustomAuthentication();
    builder.Services.AddAuthorization();

    var app = builder.Build();

    await app.RunDatabaseMigrationsAsync();

    app.UseDefaultFiles();
    app.UseStaticFiles();

    app.UseSwaggerInDevelopment();
    app.UseHstsInProduction();
    app.UseHttpsRedirection();

    app.UseRouting();
    app.UseCorsInDevelopment();
    app.UseAuthentication();
    app.UseAuthorization();

    // Map your APIs here.
    app.MapIdentityApi();
    app.MapExampleApi();

    // Fall back to the React app if no routes match.
    app.MapFallbackToFile("index.html");

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Unhandled exception");
}
finally
{
    Log.CloseAndFlush();
}
