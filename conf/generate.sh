#!/usr/bin/env sh
set -eu

SCRIPT_DIR="$(cd -- "$(dirname -- "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

spacetime generate \
  --lang typescript \
  --out-dir "$REPO_ROOT/client/src/module_bindings" \
  --project-path "$REPO_ROOT/server"
