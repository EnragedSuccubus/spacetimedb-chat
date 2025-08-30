Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')

spacetime generate `
  --lang typescript `
  --out-dir (Join-Path $RepoRoot 'client/src/module_bindings') `
  --project-path (Join-Path $RepoRoot 'server')

