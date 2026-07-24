param(
  [Parameter(Mandatory = $true)]
  [int]$Issue
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "Required command not found: gh"
}

gh issue edit $Issue --add-label "type: hotfix"
Write-Host "Added type: hotfix to issue #$Issue"

