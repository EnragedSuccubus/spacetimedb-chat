Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')

spacetime publish `
  --project-path (Join-Path $RepoRoot 'server') `
  spacetime-chat `
  --delete-data

