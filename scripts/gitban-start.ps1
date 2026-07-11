param(
  [Parameter(Mandatory = $true)]
  [int]$Issue,

  [ValidateSet("feat", "bug", "hot", "ch", "sp")]
  [string]$Prefix,

  [string]$Base = "main"
)

$ErrorActionPreference = "Stop"

function Assert-Command($Name) {
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "Required command not found: $Name"
  }
}

function ConvertTo-Slug($Text) {
  $slug = $Text.ToLowerInvariant()
  $slug = $slug -replace "[^a-z0-9]+", "-"
  $slug = $slug.Trim("-")
  if ($slug.Length -gt 40) {
    $slug = $slug.Substring(0, 40).Trim("-")
  }
  if (-not $slug) {
    $slug = "issue"
  }
  return $slug
}

Assert-Command git
Assert-Command gh

$status = git status --porcelain
if ($status) {
  throw "Working tree has uncommitted changes. Commit, stash, or discard them before starting a new GitBan branch."
}

$issueJson = gh issue view $Issue --json title,labels | ConvertFrom-Json
$labels = @($issueJson.labels | ForEach-Object { $_.name })

if (-not $Prefix) {
  if ($labels -contains "type: feature") { $Prefix = "feat" }
  elseif ($labels -contains "type: bug") { $Prefix = "bug" }
  elseif ($labels -contains "type: hotfix") { $Prefix = "hot" }
  elseif ($labels -contains "type: chore") { $Prefix = "ch" }
  elseif ($labels -contains "type: spike") { $Prefix = "sp" }
  else { $Prefix = "ch" }
}

$slug = ConvertTo-Slug $issueJson.title
$branch = "$Prefix/$slug-$Issue"

git fetch origin $Base
git switch $Base
git pull --ff-only origin $Base

gh issue edit $Issue --add-assignee "@me"
git switch -c $branch

Write-Host "Started GitBan issue #$Issue on branch $branch"

