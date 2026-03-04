#!/bin/bash
# Redeploy LiveVerify app to Pixel 6a over WiFi
# Usage: ./pixel6a_redeploy.sh [--no-build]

set -e

ADB="/home/paul/Android/Sdk/platform-tools/adb"
APK="app/build/outputs/apk/debug/app-debug.apk"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

cd "$SCRIPT_DIR"

# Find Pixel 6a device (bluejay) - try IP first, then mDNS
DEVICE=$($ADB devices -l 2>/dev/null | grep "bluejay" | head -1 | awk '{print $1}')

if [ -z "$DEVICE" ]; then
    echo "Pixel 6a not found. Enable Wireless debugging on phone."
    echo "Then pair if needed: $ADB pair <ip>:<port> <code>"
    echo "Then connect: $ADB connect <ip>:<port>"
    exit 1
fi

echo "Found device: $DEVICE"

# Build unless --no-build flag
if [[ "$1" != "--no-build" ]]; then
    echo "Building..."
    JAVA_HOME=/snap/android-studio/current/jbr ./gradlew assembleDebug
fi

# Install
echo "Installing to Pixel 6a..."
$ADB -s "$DEVICE" install -r "$APK"

# Launch
echo "Launching..."
$ADB -s "$DEVICE" shell am start -n com.liveverify.app/.MainActivity

echo "Done!"
