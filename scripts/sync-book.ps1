# Copie les chapitres du livre depuis le dossier d'ecriture vers src/content/book/
$src = "C:\Users\François\Desktop\ecriture\generique\ai_agents\output"
$dst = Join-Path $PSScriptRoot "..\src\content\book"

if (!(Test-Path $dst)) { New-Item -ItemType Directory -Force $dst | Out-Null }

$copied = 0
Get-ChildItem $src -Filter "*.md" | ForEach-Object {
  Copy-Item $_.FullName -Destination $dst -Force
  $copied++
}

Write-Host "OK $copied chapitres synchronises vers src/content/book/" -ForegroundColor Green
