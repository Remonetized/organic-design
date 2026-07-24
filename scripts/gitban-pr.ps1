param(
  [Parameter(Mandatory = $true)]
  [int]$Issue,

  [string]$Base = "main",

  [string]$Title,

  [switch]$Draft
)

$ErrorActionPreference = "Stop"

function Assert-Command($Name) {
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "Required command not found: $Name"
  }
}

Assert-Command git
Assert-Command gh

$branch = (git branch --show-current).Trim()
if (-not $branch) {
  throw "Could not determine current branch."
}

if ($branch -eq $Base) {
  throw "Refusing to open a PR from $Base. Switch to an issue branch first."
}

if (-not $Title) {
  $issueData = gh issue view $Issue --json title | ConvertFrom-Json
  $Title = $issueData.title
}

git push -u origin $branch

$body = @"
Closes #$Issue

## Verification

- [ ] Tests, lint, or build checks were run where applicable.
- [ ] Manual testing was completed where applicable.
- [ ] Documentation was updated where applicable.
"@

$args = @(
  "pr", "create",
  "--base", $Base,
  "--head", $branch,
  "--title", $Title,
  "--body", $body
)

if ($Draft) {
  $args += "--draft"
}

gh @args

