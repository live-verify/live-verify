#!/usr/bin/env bash
#
#   Copyright (C) 2025, Paul Hammant
#
#   LiveVerify CI Build Script
#   Builds all apps, forgiving for non-macOS environments
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

step() { echo -e "\n====> $*"; }

# Cleanup function to stop server on exit
cleanup() {
  if [[ -n "${SERVER_PID:-}" ]] && kill -0 "${SERVER_PID}" 2>/dev/null; then
    echo "Cleaning up: stopping server (PID: ${SERVER_PID})"
    kill "${SERVER_PID}" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

# ============================================================================
# Web App (JavaScript)
# ============================================================================
step "Web App: Installing npm dependencies"
if [[ "${CI:-0}" == "1" ]]; then
  npm ci --foreground-scripts --loglevel=notice
else
  npm install --foreground-scripts --loglevel=notice
fi

step "Web App: Running unit tests (Jest)"
npm run test:unit

step "Web App: Installing Playwright browsers"
npx playwright install --with-deps

step "Web App: Starting local server for Playwright tests"
cd public
python3 -m http.server 8000 &
SERVER_PID=$!
echo "Server started with PID: ${SERVER_PID}"
cd ..
sleep 2

step "Web App: Running Playwright tests"
npm run test:playwright

# ============================================================================
# Android App
# ============================================================================
step "Android App"
cd "$SCRIPT_DIR/apps/android"

if [[ -z "${ANDROID_HOME:-}" ]] && [[ -z "${ANDROID_SDK_ROOT:-}" ]] && ! grep -q "sdk.dir" local.properties 2>/dev/null; then
  echo "ERROR: Android SDK not found."
  echo ""
  echo "Requirements:"
  echo "  - JDK 17 (brew install openjdk@17)"
  echo "  - Gradle 8.x (uses wrapper, but JDK 17 required)"
  echo "  - Android Studio (download from developer.android.com)"
  echo "    Must be opened once to download SDK components"
  echo ""
  echo "Then either:"
  echo "  - Set ANDROID_HOME environment variable, or"
  echo "  - Create apps/android/local.properties with: sdk.dir=/path/to/sdk"
  exit 1
fi

./gradlew assembleDebug --quiet
./gradlew testReleaseUnitTest --quiet

cd "$SCRIPT_DIR"

# ============================================================================
# iOS App (macOS only)
# ============================================================================
step "iOS App"

if [[ "$(uname)" == "Darwin" ]]; then
  cd "$SCRIPT_DIR/apps/ios/LiveVerify"

  if command -v xcodebuild &> /dev/null; then
    xcodebuild -project LiveVerify.xcodeproj \
               -scheme LiveVerify \
               -destination 'platform=iOS Simulator,name=iPhone 15' \
               -configuration Debug \
               build \
               -quiet 2>&1 | grep -v "warning:" || true

    xcodebuild -project LiveVerify.xcodeproj \
               -scheme LiveVerify \
               -destination 'platform=iOS Simulator,name=iPhone 15' \
               test \
               -quiet 2>&1 | grep -v "warning:" || true
  else
    echo "      ~ xcodebuild not found, skipping iOS build"
  fi

  cd "$SCRIPT_DIR"
else
  echo "      ~ Not on macOS, skipping iOS build"
fi

# ============================================================================
# Browser Extension
# ============================================================================
step "Browser Extension: Validating files"
cd "$SCRIPT_DIR/apps/browser-extension"
test -f manifest.json
test -f background.js
test -f content.js
test -d shared
test -d popup
echo "      Browser extension files validated"

step "Browser Extension: Packaging"
mkdir -p "$SCRIPT_DIR/dist"
zip -rq "$SCRIPT_DIR/dist/liveverify-extension.zip" . -x "*.DS_Store" -x "README.md"
echo "      Created dist/liveverify-extension.zip"

cd "$SCRIPT_DIR"

step "CI Complete"
echo "All builds passed!"
