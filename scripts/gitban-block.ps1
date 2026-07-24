param(
  [Parameter(Mandatory = $true)]
  [int]$Issue,

  [switch]$Clear
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "Required command not found: gh"
}

if ($Clear) {
  gh issue edit $Issue --remove-label "status: blocked"
  Write-Host "Removed status: blocked from issue #$Issue"
} else {
  gh issue edit $Issue --add-label "status: blocked"
  Write-Host "Added status: blocked to issue #$Issue"
}

