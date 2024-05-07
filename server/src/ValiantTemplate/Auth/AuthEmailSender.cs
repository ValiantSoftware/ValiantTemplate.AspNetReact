using Microsoft.AspNetCore.Identity;

namespace ValiantTemplate.Auth;

public class AuthEmailSender : IEmailSender<ApplicationUser>
{
    // Obviously you need to hook up an actual email service, here!
    // For demo purposes, we'll just write the relevant information to the console.

    public Task SendConfirmationLinkAsync(ApplicationUser user, string email, string confirmationLink)
    {
        Console.WriteLine("################################################################################");
        Console.WriteLine($"Confirmation link for {email}: {confirmationLink}");
        Console.WriteLine("################################################################################");

        return Task.CompletedTask;
    }

    public Task SendPasswordResetCodeAsync(ApplicationUser user, string email, string resetCode)
    {
        Console.WriteLine("################################################################################");
        Console.WriteLine($"Password reset code for {email}: {resetCode}");
        Console.WriteLine("################################################################################");

        return Task.CompletedTask;
    }

    public Task SendPasswordResetLinkAsync(ApplicationUser user, string email, string resetLink)
    {
        Console.WriteLine("################################################################################");
        Console.WriteLine($"Password reset link for {email}: {resetLink}");
        Console.WriteLine("################################################################################");

        return Task.CompletedTask;
    }
}
