#!/usr/bin/env sh
set -eu

SCRIPT_DIR="$(cd -- "$(dirname -- "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

spacetime publish \
  --project-path "$REPO_ROOT/server" \
  spacetime-chat \
  --delete-data
