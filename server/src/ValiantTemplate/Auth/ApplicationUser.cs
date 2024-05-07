using Microsoft.AspNetCore.Identity;

namespace ValiantTemplate;

public class ApplicationUser : IdentityUser<Guid>
{
    public ApplicationUser() : base() { }
    public ApplicationUser(string userName) : base(userName) { }
}
