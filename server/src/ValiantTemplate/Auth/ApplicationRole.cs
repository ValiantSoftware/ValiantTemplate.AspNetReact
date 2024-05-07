using Microsoft.AspNetCore.Identity;

namespace ValiantTemplate;

public class ApplicationRole : IdentityRole<Guid>
{
    public ApplicationRole() : base() { }
    public ApplicationRole(string roleName) : base(roleName) { }
}
