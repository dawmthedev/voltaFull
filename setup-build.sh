#!/bin/bash
set -e

echo "Current directory: $(pwd)"
echo "Listing files:"
ls -la

# Change to client directory
cd client

# Main client install
echo "Installing client dependencies..."
npm install

# Function to fix schema-utils module
function fix_schema_utils {
  local BASE_DIR=$1
  echo "Fixing schema-utils in $BASE_DIR"
  
  SCHEMA_UTILS_DIR="$BASE_DIR/schema-utils/dist/util"
  MEMORIZE_FILE="$SCHEMA_UTILS_DIR/memorize.js"

  # Create directory if it doesn't exist
  mkdir -p "$SCHEMA_UTILS_DIR"

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

# Fix schema-utils in client's node_modules
echo "Fixing schema-utils module in client..."
fix_schema_utils "node_modules"

# Also fix schema-utils in the root node_modules (where it gets hoisted)
echo "Fixing schema-utils module in root..."
cd ..
fix_schema_utils "node_modules"

# Go back to client directory
cd client

echo "Schema-utils fixes applied"

# Now run the build
echo "Running npm build..."
npm run build
