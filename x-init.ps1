$pnpm = Get-Command "pnpm" -ErrorAction SilentlyContinue
if ($pnpm) {
    Write-Output "Installing front-end packages with PNPM..."
    pnpm install --prefix "$PSScriptRoot/client/"
} else {
    Write-Output "PNPM is not installed. This project uses PNPM to manage front end packages."
        "Please install PNPM by running either of the the following commands:"
        "`> winget install --id pnpm.pnpm --exact"
        "`> npm install -g pnpm"
        return
}

Write-Output "Setting up default database connection..."
$csproj = "$PSScriptRoot/server/src/ValiantTemplate/ValiantTemplate.csproj"
$userSecrets = dotnet user-secrets --project $csproj list
if ($userSecrets -notmatch "ConnectionStrings:Main") {
    Write-Output "Setting up default database connection"
    $tempDirectory = (Get-Item -Path ([System.IO.Path]::GetTempPath())).FullName
    $tempDatabase = Join-Path -Path $tempDirectory -ChildPath "valiant_template_demo.sqlite3"
    dotnet user-secrets --project $csproj set "ConnectionStrings:Main" "Data source=$tempDatabase"
}

Write-Output "Application initialization successful"
