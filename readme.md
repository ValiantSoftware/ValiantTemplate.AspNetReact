# Valiant Template: ASP.NET Core with React

This is a very simple template that demonstrates a React front-end working with an ASP.NET Core back-end.

This is not an enterprise-ready template; rather, it's a simple example that I use to show my teach-savvy friends and colleagues how ASP.NET Core and React can work together.

It makes a number of opinionated decisions:
- Tailwind for styling.
- PNPM over NPM.
- Minimal APIs over MVC.

## Getting started:

To get everything installed and set up:
1. (Optional)  Change the `name` value in `package.json` and the `<UserSecretsId>` value in `ValiantTemplate.csproj` to match your intended app name.
2. (Optional) Find-and-replace the word "Valiant" to match your intended app name.
3. Run `x-init.ps1` to initialize everything.
4. You're good to go!

To run the app in your dev environment:
1. Run `x-dev-server.ps1` to start the dotnet watch process that serves the back-end.
2. Run `x-dev-client.ps1` to start the Vite process that serves the front-end.
3. You're good to go! Navigate to the URL being served by Vite in step #2
