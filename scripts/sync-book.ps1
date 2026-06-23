# Copie + nettoyage des chapitres du livre depuis le dossier d'ecriture vers src/content/book/
# Le nettoyage remplace les incises au tiret cadratin (—) par une virgule.
# Les separateurs structurels (titres markdown, cellules de tableau) sont preserves.
$src = "C:\Users\François\Desktop\ecriture\generique\ai_agents\output"
$dst = Join-Path $PSScriptRoot "..\src\content\book"

if (!(Test-Path $dst)) { New-Item -ItemType Directory -Force $dst | Out-Null }

$dash = [char]0x2014                              # tiret cadratin —
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

function Clean-EmDashes([string[]]$lines) {
  $inFence = $false
  for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]

    # Bascule d'etat des blocs de code (``` ou ~~~) : on ne touche pas la ligne de fence
    if ($line -match '^\s*(```|~~~)') { $inFence = -not $inFence; continue }

    if (-not $inFence) {
      # Titre markdown (# ... — ...) : separateur structurel -> on ne touche pas
      if ($line -match '^\s*#{1,6}\s') { continue }
      # Ligne de tableau (| ... — ... |) : le cadratin = cellule vide -> on ne touche pas
      if ($line -match '^\s*\|')       { continue }
      # Puce en debut de ligne : "— " -> "- " (vraie puce markdown)
      $line = $line -replace "^(\s*)$dash ", '$1- '
    }

    # Regles communes (prose hors-code + commentaires dans le code) :
    # cadratin colle a une ponctuation " —," / " —." -> on garde la ponctuation, on retire le tiret
    $line = $line -replace " $dash([,.;:])", '$1'
    # incise " — " -> ", "
    $line = $line -replace " $dash ", ', '

    $lines[$i] = $line
  }
  return $lines
}

$copied = 0
Get-ChildItem $src -Filter "*.md" | ForEach-Object {
  $target = Join-Path $dst $_.Name
  $lines  = @(Get-Content $_.FullName -Encoding UTF8)   # @() force un tableau meme pour 1 ligne
  $lines  = Clean-EmDashes $lines
  # Ecriture en UTF-8 sans BOM, fins de ligne LF (diffs git propres)
  [System.IO.File]::WriteAllText($target, ($lines -join "`n") + "`n", $utf8NoBom)
  $copied++
}

Write-Host "OK $copied chapitres synchronises + nettoyes vers src/content/book/" -ForegroundColor Green
