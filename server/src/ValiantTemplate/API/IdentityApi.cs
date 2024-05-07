using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace ValiantTemplate.API;

public static class IdentityApi
{
    public static void MapIdentityApi(this WebApplication app)
    {
        var api = app.MapGroup("/api/auth/");

        // Map the standard identity API.
        api.MapIdentityApi<ApplicationUser>();

        // Add a logout endpoint to sign out.
        api.MapPost("/logout", async (SignInManager<ApplicationUser> signInManager) =>
        {
            await signInManager.SignOutAsync();
            return TypedResults.Ok();
        });

        // Add a status endpoint to check if the user is authenticated. Used for our client-side layout and routing.
        api.MapGet("/status", (ClaimsPrincipal user) =>
        {
            return TypedResults.Ok(new { IsAuthenticated = user.Identity.IsAuthenticated, Email = user.Identity.Name });
        });
    }
}
