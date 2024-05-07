namespace ValiantTemplate.API;

public static class ExampleApi
{
    public static void MapExampleApi(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/example/guid", () => Guid.NewGuid().ToString()).RequireAuthorization().WithOpenApi();
    }
}
