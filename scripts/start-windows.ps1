$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Split-Path -Parent $ScriptDir

Set-Location $ProjectDir

if (-not (Test-Path ".env")) {
    Write-Host "No .env file found. Copying .env.example to .env..."
    Copy-Item ".env.example" ".env"
    Write-Host "Please edit .env and set SECRET_KEY, then re-run this script."
    exit 1
}

Write-Host "Building and starting Prelegal..."
docker compose up --build -d

Write-Host ""
Write-Host "Prelegal is running at http://localhost:8000"
Write-Host "Run scripts\stop-windows.ps1 to stop."
