#!/bin/bash
set -e

# Debug info - show where we are and what's around us
echo "=== ENVIRONMENT DEBUGGING ==="
echo "Current directory: $(pwd)"
echo "Files in current directory:"
ls -la
echo "Content of /vercel:"
ls -la /vercel || echo "No /vercel directory"
echo "Content of /vercel/path0 (if exists):"
ls -la /vercel/path0 || echo "No /vercel/path0 directory"

ROOT_DIR=$(pwd)
echo "Root directory: $ROOT_DIR"

# Search for schema-utils to find all instances
echo "=== SEARCHING FOR SCHEMA-UTILS PACKAGES ==="
find $ROOT_DIR -name "schema-utils" -type d | grep -v "node_modules/schema-utils/node_modules" || echo "No schema-utils found"

# Change to client directory
cd client
CLIENT_DIR=$(pwd)
echo "Client directory: $CLIENT_DIR"

# Main client install
echo "Installing client dependencies..."
npm install

# Force reinstall schema-utils in the right version
echo "Force reinstalling schema-utils 4.2.0..."
npm install --no-save schema-utils@4.2.0

# Function to fix schema-utils module - with absolute paths
function fix_schema_utils {
  local BASE_DIR=$1
  echo "Fixing schema-utils in $BASE_DIR"
  
  SCHEMA_UTILS_DIR="$BASE_DIR/schema-utils/dist/util"
  MEMORIZE_FILE="$SCHEMA_UTILS_DIR/memorize.js"

  # Create directory if it doesn't exist
  mkdir -p "$SCHEMA_UTILS_DIR"
  echo "Created directory: $SCHEMA_UTILS_DIR"

  # Create the missing memorize.js file
  cat > "$MEMORIZE_FILE" << 'EOF'
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = memorize;

function memorize(fn) {
  const cache = new Map();
  
  // Return a memoized version of the function
  return (...args) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    
    return result;
  };
}
EOF
  echo "Created memorize.js in $SCHEMA_UTILS_DIR"
  ls -la "$SCHEMA_UTILS_DIR"
}

# Fix schema-utils in client's node_modules using ABSOLUTE path
echo "Fixing schema-utils module in client's node_modules..."
fix_schema_utils "$CLIENT_DIR/node_modules"

# Fix in root node_modules using ABSOLUTE path
echo "Fixing schema-utils module in root node_modules..."
fix_schema_utils "$ROOT_DIR/node_modules"

# Try the vercel specific paths if they exist
if [ -d "/vercel/path0/node_modules" ]; then
  echo "Fixing schema-utils module in /vercel/path0/node_modules..."
  fix_schema_utils "/vercel/path0/node_modules"
  
  # Look for all schema-utils occurrences in Vercel paths
  echo "All schema-utils instances in /vercel:"
  find /vercel -name "schema-utils" -type d || echo "None found"
  
  # Direct fix for the exact path mentioned in the error
  VERCEL_UTIL_DIR="/vercel/path0/node_modules/schema-utils/dist/util"
  mkdir -p "$VERCEL_UTIL_DIR"
  cp "$CLIENT_DIR/node_modules/schema-utils/dist/util/memorize.js" "$VERCEL_UTIL_DIR/" || echo "Copy failed"
  echo "Direct fix applied to: $VERCEL_UTIL_DIR"
  ls -la "$VERCEL_UTIL_DIR" || echo "Cannot list directory"
fi

echo "All schema-utils fixes applied"

# Now run the build
echo "Running npm build..."
cd "$CLIENT_DIR"
npm run build
