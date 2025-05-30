#!/usr/bin/env bash
set -euo pipefail

# ─── Fast-path for Codex: skip all installs if SKIP_SETUP=1 ─────────────────
if [ "${SKIP_SETUP:-0}" = "1" ]; then
  echo "🏃  Skipping setup (SKIP_SETUP=1)"
  exit 0
fi

# ─── 1) Load Volta or NVM (fallback to system Node) ─────────────────────────
if command -v volta >/dev/null 2>&1; then
  echo "🔧 Using Volta-pinned Node"
elif [ -s "$HOME/.nvm/nvm.sh" ]; then
  echo "🔧 Sourcing NVM and using .nvmrc"
  # shellcheck source=/dev/null
  source "$HOME/.nvm/nvm.sh"
  nvm install && nvm use
elif command -v nvm >/dev/null 2>&1; then
  echo "🔧 nvm in PATH – installing from .nvmrc"
  nvm install && nvm use
else
  echo "⚠️  No Volta or NVM — using system Node"
fi

# ─── 2) Version report ───────────────────────────────────────────────────────
echo "📦 Node: $(node -v)   npm: $(npm -v)"

# ─── 3) One-and-done install marker ─────────────────────────────────────────
MARKER=".setup-done"
if [ ! -f "$MARKER" ]; then
  echo "🔧 Installing all dependencies…"
  npm install

  # Install dependencies in server directory if it exists
  if [ -d "server" ]; then
    echo "🔧 Installing dependencies in server directory…"
    (cd server && npm install)
  fi

  # Install dependencies in client directory if it exists
  if [ -d "client" ]; then
    echo "🔧 Installing dependencies in client directory…"
    (cd client && npm install)
  fi

  # write the marker so we don’t re-install next time
  date > "$MARKER"
else
  echo "✅ Dependencies already installed — skipping"
fi

# ─── 4) Fire up server + client-new ─────────────────────────────────────────
echo "🚀 Starting server & client…"
npm run dev
