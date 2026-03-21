#!/bin/bash
# Package the browser extension for Chrome Web Store upload.
# Usage: ./scripts/package-extension.sh
# Output: dist/liveverify-extension.zip

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
EXT_DIR="$REPO_ROOT/apps/browser-extension"
OUT_DIR="$REPO_ROOT/dist"
OUT_FILE="$OUT_DIR/liveverify-extension.zip"

# Sync shared modules from canonical sources
echo "Syncing shared modules..."
npm run sync-shared --prefix "$REPO_ROOT"

# Create output directory
mkdir -p "$OUT_DIR"

# Remove old zip if present
rm -f "$OUT_FILE"

# Package
echo "Packaging extension..."
cd "$EXT_DIR"
zip -r "$OUT_FILE" . \
    -x "README.md" \
    -x "browser-ui-change.png" \
    -x "__tests__/*" \
    -x "*.test.*" \
    -x ".DS_Store" \
    -x "*.map"

echo ""
echo "Created: $OUT_FILE"
echo "Size: $(du -h "$OUT_FILE" | cut -f1)"
echo ""
echo "Upload to: https://chrome.google.com/webstore/devconsole"
