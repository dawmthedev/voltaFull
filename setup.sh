#!/usr/bin/env bash
set -euo pipefail

# ─── 1) Detect Node manager or fall back ────────────────────────────────────────
if command -v volta >/dev/null 2>&1; then
  echo "🔧  Detected Volta — using the pin in package.json (volta key)"
elif [ -s "$HOME/.nvm/nvm.sh" ]; then
  echo "🔧  Loading nvm..."
  # shellcheck source=/dev/null
  source "$HOME/.nvm/nvm.sh"
  echo "🔧  Installing & using Node $(cat .nvmrc)..."
  nvm install
  nvm use
elif command -v nvm >/dev/null 2>&1; then
  echo "🔧  nvm in PATH — installing & using Node $(cat .nvmrc)..."
  nvm install
  nvm use
else
  echo "⚠️  No Volta or nvm found — falling back to system Node"
fi

# ─── 2) Report versions ─────────────────────────────────────────────────────────
echo "📦  Node: $(node -v)   npm: $(npm -v)"
echo "🔍  (If your package.json 'engines' field still complains, you can loosen it to \"node\": \">=18 <=20\".)"

# ─── 3) Root: install dev deps 
echo "🔧  Installing root dependencies..."
npm install

# ─── 4) Server: install deps ───────────────────────────────────────────────────
echo "🔧  Installing server dependencies..."
( cd server && yarn install )

# ─── 5) Client: fix peer-deps & install ────────────────────────────────────────
echo "🔧  Preparing client for install..."
( cd client && \
    # bump date-fns so @date-io/date-fns@3.0.0 is happy
    npm install date-fns@^3.6.0 && \
    npm install
)

echo "🚀  Starting full-stack dev environment..."
npm run dev

