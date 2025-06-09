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

# Create missing memorize.js file in schema-utils
echo "Fixing schema-utils module..."
SCHEMA_UTILS_DIR="node_modules/schema-utils/dist/util"
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

echo "Schema-utils fix applied"

# Now run the build
echo "Running npm build..."
npm run build
