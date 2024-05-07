using System.Reflection;
using KingMigrations.MigrationParsers;
using KingMigrations.MigrationSources;
using KingMigrations.Sqlite;
using ValiantTemplate.Auth;
using ValiantTemplate.Database;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.Sqlite;

namespace ValiantTemplate;

public static class ProgramExtensions
{
    public static void AddSwagger(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
    }

    public static void UseSwaggerInDevelopment(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
    }

    public static void UseCorsInDevelopment(this WebApplication app)
    {
        // In development, we're serving the client via Vite and we need the right CORS options so that we can talk to it.
        // This isn't necessary in production because we're serving the built client as static files from our server app.
        // Reminder: This call must be after UseRouting and before UseAuthentication.

        if (app.Environment.IsDevelopment())
        {
            app.UseCors(options =>
            {
                options.AllowAnyOrigin().AllowAnyHeader();
            });
        }
    }

    public static void UseHstsInProduction(this WebApplication app)
    {
        if (!app.Environment.IsDevelopment())
        {
            // The default HSTS value is 30 days.
            // You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }
    }

    public static void AddCustomAuthentication(this IServiceCollection services)
    {
        services.AddTransient<IEmailSender<ApplicationUser>, AuthEmailSender>();

        services
            .AddIdentityApiEndpoints<ApplicationUser>(options => options.SetLoginRequirements())
            .AddEntityFrameworkStores<ApplicationDbContext>();
    }

    public static void SetLoginRequirements(this IdentityOptions options)
    {
        // This section controls the requirements for user logins and passwords.

        options.User.RequireUniqueEmail = true;
        options.Password.RequireDigit = false;
        options.Password.RequiredLength = 4;
        options.Password.RequiredUniqueChars = 0;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireNonAlphanumeric = false;
    }

    public static async Task RunDatabaseMigrationsAsync(this WebApplication app)
    {
        var serviceScopeFactory = app.Services.GetService<IServiceScopeFactory>();
        using var serviceScope = serviceScopeFactory.CreateScope();

        var migrator = new SqliteMigrationApplier();
        var migrationSource = new AssemblyResourceMigrationSource(Assembly.GetExecutingAssembly());
        migrationSource.AddParser(".sql", new SemicolonDelimitedMigrationParser());

        using var connection = new SqliteConnection();
        connection.ConnectionString = app.Configuration.GetConnectionString("Main");
        await connection.OpenAsync();
        await migrator.ApplyMigrationsAsync(connection, migrationSource);

    }

    public static async Task CreateUserAsync(this WebApplication app, string email, string password)
    {
        var serviceScopeFactory = app.Services.GetService<IServiceScopeFactory>();
        using var serviceScope = serviceScopeFactory.CreateScope();

        var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        var user = await userManager.FindByEmailAsync(email);
        if (user is null)
        {
            user = new ApplicationUser()
            {
                Id = Guid.NewGuid(),
                UserName = email,
                Email = email,
            };

            await userManager.CreateAsync(user, password);
        }
    }
}
