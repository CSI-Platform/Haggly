param(
  [string]$OutFile = "AI_REVIEW_BRIEF.md",
  [int]$MaxLinesPerFile = 240
)

$ErrorActionPreference = "Stop"

function Add-Line {
  param([System.Collections.Generic.List[string]]$Lines, [string]$Text = "")
  $Lines.Add($Text) | Out-Null
}

function Add-FileSection {
  param(
    [System.Collections.Generic.List[string]]$Lines,
    [string]$Path,
    [int]$MaxLines
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    return
  }

  $content = Get-Content -LiteralPath $Path -ErrorAction Stop
  $shown = $content | Select-Object -First $MaxLines
  $extension = [System.IO.Path]::GetExtension($Path).TrimStart(".")

  Add-Line $Lines
  Add-Line $Lines "## File: $Path"
  Add-Line $Lines ('```' + $extension)
  foreach ($line in $shown) {
    Add-Line $Lines $line
  }
  if ($content.Count -gt $MaxLines) {
    Add-Line $Lines ""
    Add-Line $Lines "... truncated after $MaxLines lines ..."
  }
  Add-Line $Lines '```'
}

$repoRoot = git rev-parse --show-toplevel
Set-Location $repoRoot

$lines = [System.Collections.Generic.List[string]]::new()
$head = git rev-parse --short HEAD
$branch = git branch --show-current
$remote = git remote get-url origin
$status = git status --short
$files = git ls-files

Add-Line $lines "# AI Review Brief: Haggly v2"
Add-Line $lines
Add-Line $lines "You are reviewing a private repo for Haggly v2."
Add-Line $lines
Add-Line $lines "Context:"
Add-Line $lines "- Goal: turn Haggly into a green AI negotiation chat app with a dashboard."
Add-Line $lines '- Current repo starts from the old React/Vite prototype from `StepFatherGoose/haggly-1`.'
Add-Line $lines '- The live static site at `www.haggly.io` is separate v1 code from `StepFatherGoose/haggly`; do not assume it is the desired product direction.'
Add-Line $lines "- Desired output: product/technical review, what to keep, what to remove, missing architecture, roadmap, and first implementation tickets."
Add-Line $lines
Add-Line $lines "Please answer with:"
Add-Line $lines "1. What this app currently is"
Add-Line $lines "2. What is missing for the v2 vision"
Add-Line $lines "3. What code/content should be kept"
Add-Line $lines "4. What should be replaced or removed"
Add-Line $lines "5. Recommended architecture"
Add-Line $lines "6. First 5-10 GitHub issues/tickets"
Add-Line $lines "7. Biggest risks or unclear decisions"
Add-Line $lines
Add-Line $lines "Repo metadata:"
Add-Line $lines "- Remote: $remote"
Add-Line $lines "- Branch: $branch"
Add-Line $lines "- Commit: $head"
Add-Line $lines
Add-Line $lines "Working tree status:"
if ($status) {
  foreach ($line in $status) {
    Add-Line $lines "- $line"
  }
} else {
  Add-Line $lines "- Clean"
}

Add-Line $lines
Add-Line $lines "Tracked file tree:"
Add-Line $lines '```text'
foreach ($file in $files) {
  Add-Line $lines $file
}
Add-Line $lines '```'

$importantFiles = @(
  "README.md",
  "AGENTS.md",
  "package.json",
  "src/App.jsx",
  "src/index.css",
  "src/components/InputForm.jsx",
  "src/components/ResponseCard.jsx",
  "src/components/CopyButton.jsx",
  "src/utils/messageGenerator.js",
  "ENHANCED_FEATURES.md",
  "research/NLP_NEGOTIATION_STRATEGIES.md",
  "scripts/CAR_NEGOTIATION_SCRIPTS.md",
  ".github/workflows/ci.yml"
)

foreach ($file in $importantFiles) {
  Add-FileSection -Lines $lines -Path $file -MaxLines $MaxLinesPerFile
}

$resolvedOut = Join-Path $repoRoot $OutFile
Set-Content -LiteralPath $resolvedOut -Value $lines -Encoding UTF8
Write-Host "Wrote $resolvedOut"
