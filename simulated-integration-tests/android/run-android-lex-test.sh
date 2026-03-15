#!/usr/bin/env bash
# run-android-lex-test.sh — Full-stack FAILING verification test on Android.
#
# Lex Luthor has a fake NYPD warrant card. The NYPD authority chain
# (ids.nypd.nyc.gov → ny.gov) is set up and valid, but the claim hash
# was never registered — because NYPD never issued this credential.
#
# The app should walk the authority chain but fail on hash lookup (404),
# showing "Not Verified".
#
# DNS resolution and TLS trust are handled in-app via intent extras:
#   - DNS_OVERRIDES: maps test domains to 10.0.2.2 (emulator host loopback)
#   - trustAllCerts: accepts Caddy's self-signed TLS (debug builds only)
#
# Prerequisites:
#   - Container runtime (docker or podman) with compose
#   - Android SDK with emulator + adb
#   - An existing AVD (set AVD_NAME or defaults to first available)
#   - Rootless port 443: sysctl net.ipv4.ip_unprivileged_port_start=80
#   - jq, curl, sha256sum

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FST_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_DIR="$(cd "$FST_DIR/.." && pwd)"
ANDROID_DIR="${PROJECT_DIR}/apps/android"
RESULTS_DIR="${PROJECT_DIR}/public/test-results"

ANDROID_HOME="${ANDROID_HOME:-$HOME/Android/Sdk}"
ADB_BIN="${ANDROID_HOME}/platform-tools/adb"
ADB="$ADB_BIN -s emulator-5554"
EMULATOR="${ANDROID_HOME}/emulator/emulator"

# Use first available AVD if not specified
AVD_NAME="${AVD_NAME:-$($EMULATOR -list-avds | head -1)}"
if [ -z "$AVD_NAME" ]; then
    echo "Error: no AVD found. Create one with avdmanager or Android Studio."
    exit 1
fi
echo "Using AVD: $AVD_NAME"

# Auto-detect compose command
if command -v docker &>/dev/null && docker compose version &>/dev/null 2>&1; then
    COMPOSE="docker compose"
elif command -v podman-compose &>/dev/null; then
    COMPOSE="podman-compose"
else
    echo "Error: no compose tool found (docker compose / podman-compose)"
    exit 1
fi

COMPOSE_FILE="${FST_DIR}/docker-compose.yml"
EMULATOR_PID=""

function cleanup {
    echo "=== Cleaning up ==="
    if [ -n "$EMULATOR_PID" ] && kill -0 "$EMULATOR_PID" 2>/dev/null; then
        echo "Stopping emulator..."
        $ADB -s emulator-5554 emu kill 2>/dev/null || true
        wait "$EMULATOR_PID" 2>/dev/null || true
    fi
    echo "Stopping containers..."
    $COMPOSE -f "$COMPOSE_FILE" down -v 2>/dev/null || true
}
trap cleanup EXIT

# ── 1. Start backend ──────────────────────────────────────────────

# Tear down any stale containers from a previous run
$COMPOSE -f "$COMPOSE_FILE" down -v 2>/dev/null || true

echo "=== Starting backend + Caddy ==="
$COMPOSE -f "$COMPOSE_FILE" up --build -d

echo "=== Waiting for Caddy ==="
for i in $(seq 1 30); do
    if curl -sk --resolve ids.nypd.nyc.gov:443:127.0.0.1 \
        https://ids.nypd.nyc.gov/2026/verification-meta.json > /dev/null 2>&1; then
        echo "Caddy ready."
        break
    fi
    if [ "$i" -eq 30 ]; then
        echo "Timeout waiting for Caddy"
        $COMPOSE -f "$COMPOSE_FILE" logs
        exit 1
    fi
    sleep 1
done

echo "=== Seeding NYPD authority chain (no claim hash) ==="
bash "${FST_DIR}/harness/seed-chain-lex.sh"

# ── 2. Build debug APK (while emulator boots) ────────────────────

echo "=== Building debug APK ==="
cd "$ANDROID_DIR"
./gradlew :app:assembleDebug --no-daemon -q
cd "$PROJECT_DIR"

# ── 3. Start emulator ────────────────────────────────────────────

echo "=== Starting emulator ==="
$EMULATOR -avd "$AVD_NAME" \
    -no-snapshot \
    -no-audio \
    -gpu swiftshader_indirect \
    -no-boot-anim \
    &
EMULATOR_PID=$!

echo "Waiting for emulator to boot..."
$ADB wait-for-device
for i in $(seq 1 120); do
    BOOT=$($ADB shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$BOOT" = "1" ]; then
        echo "Emulator booted."
        break
    fi
    if [ "$i" -eq 120 ]; then
        echo "Timeout waiting for emulator boot"
        exit 1
    fi
    sleep 1
done

# Short pause for system services to stabilize
sleep 3

# ── 4. Install APK ───────────────────────────────────────────────

echo "=== Installing APK ==="
$ADB install -r "${ANDROID_DIR}/app/build/outputs/apk/debug/app-debug.apk"

# ── 5. Launch with image OCR + DNS overrides ──────────────────────

echo "=== Pushing warrant card image to emulator ==="
WARRANT_CARD="${FST_DIR}/fixtures/lex-warrant-card.png"
# Push to app's private files dir (scoped storage on API 30+ blocks /sdcard reads)
APP_FILES="/data/data/com.liveverify.app/files"
$ADB push "$WARRANT_CARD" /data/local/tmp/lex-warrant-card.png
$ADB shell run-as com.liveverify.app mkdir -p "$APP_FILES"
$ADB shell run-as com.liveverify.app cp /data/local/tmp/lex-warrant-card.png "$APP_FILES/"
IMAGE_PATH="${APP_FILES}/lex-warrant-card.png"

echo "=== Launching verification (image OCR mode — expecting failure) ==="
# 10.0.2.2 is the Android emulator's alias for the host machine's loopback.
DNS_OVERRIDES="ids.nypd.nyc.gov=10.0.2.2,ny.gov=10.0.2.2"

# Launch with image path — ML Kit OCR runs on the warrant card image.
# Lex's claim hash was never seeded, so verification should fail (404).
$ADB shell am start \
    -n com.liveverify.app/.MainActivity \
    --es com.liveverify.app.VERIFY_IMAGE "$IMAGE_PATH" \
    --es com.liveverify.app.DNS_OVERRIDES "$DNS_OVERRIDES"

# Wait for verification to complete (ML Kit model download + OCR + network + chain walk)
echo "Waiting for verification to complete..."
sleep 35

# Dismiss ANR dialogs (swiftshader GPU triggers "System UI isn't responding").
dismiss_anr() {
    for attempt in $(seq 1 8); do
        $ADB shell uiautomator dump /sdcard/ui.xml 2>/dev/null || true
        $ADB pull /sdcard/ui.xml /tmp/anr-ui.xml 2>/dev/null || true
        if grep -q 'text="Wait"' /tmp/anr-ui.xml 2>/dev/null; then
            local bounds=$(grep -oP 'text="Wait"[^>]*bounds="\K[^"]+' /tmp/anr-ui.xml | head -1)
            if [ -n "$bounds" ]; then
                local x1=$(echo "$bounds" | sed 's/\[/\n/g;s/\]/\n/g' | grep ',' | head -1 | cut -d',' -f1)
                local y1=$(echo "$bounds" | sed 's/\[/\n/g;s/\]/\n/g' | grep ',' | head -1 | cut -d',' -f2)
                local x2=$(echo "$bounds" | sed 's/\[/\n/g;s/\]/\n/g' | grep ',' | tail -1 | cut -d',' -f1)
                local y2=$(echo "$bounds" | sed 's/\[/\n/g;s/\]/\n/g' | grep ',' | tail -1 | cut -d',' -f2)
                local cx=$(( (x1 + x2) / 2 ))
                local cy=$(( (y1 + y2) / 2 ))
                $ADB shell input tap "$cx" "$cy" 2>/dev/null || true
            fi
            sleep 1
        else
            break
        fi
    done
}
dismiss_anr

# ── 6. Capture results ───────────────────────────────────────────

echo "=== Capturing screenshots ==="
mkdir -p "$RESULTS_DIR"

# Main result
$ADB shell screencap -p /sdcard/android-lex-result.png
$ADB pull /sdcard/android-lex-result.png "${RESULTS_DIR}/android-lex-result.png"
echo "  result screenshot saved"

# Captured tab (shows the warrant card image that was OCR'd)
dismiss_anr
$ADB shell screencap -p /sdcard/android-lex-captured.png
$ADB pull /sdcard/android-lex-captured.png "${RESULTS_DIR}/android-lex-captured.png"
echo "  captured tab saved"

# Use uiautomator to find and tap tabs by text content.
tap_tab() {
    local tab_text="$1"
    $ADB shell uiautomator dump /sdcard/ui.xml 2>/dev/null
    $ADB pull /sdcard/ui.xml /tmp/android-ui.xml 2>/dev/null
    local bounds=$(grep -oP "text=\"${tab_text}\"[^>]*bounds=\"\K[^\"]+" /tmp/android-ui.xml 2>/dev/null | head -1)
    if [ -n "$bounds" ]; then
        local x1=$(echo "$bounds" | sed 's/\[/\n/g' | sed 's/\]/\n/g' | grep ',' | head -1 | cut -d',' -f1)
        local y1=$(echo "$bounds" | sed 's/\[/\n/g' | sed 's/\]/\n/g' | grep ',' | head -1 | cut -d',' -f2)
        local x2=$(echo "$bounds" | sed 's/\[/\n/g' | sed 's/\]/\n/g' | grep ',' | tail -1 | cut -d',' -f1)
        local y2=$(echo "$bounds" | sed 's/\[/\n/g' | sed 's/\]/\n/g' | grep ',' | tail -1 | cut -d',' -f2)
        local cx=$(( (x1 + x2) / 2 ))
        local cy=$(( (y1 + y2) / 2 ))
        $ADB shell input tap "$cx" "$cy"
        echo "    tapped $tab_text at ($cx, $cy)"
    else
        echo "    WARNING: could not find tab '$tab_text' in UI dump"
        grep -o 'text="[^"]*"' /tmp/android-ui.xml 2>/dev/null | head -20 || true
    fi
}

# Tap "Extracted" tab
tap_tab "Extracted"
sleep 2
dismiss_anr
$ADB shell screencap -p /sdcard/android-lex-extracted.png
$ADB pull /sdcard/android-lex-extracted.png "${RESULTS_DIR}/android-lex-extracted.png"
echo "  extracted tab saved"

# Tap "Normalized" tab
tap_tab "Normalized"
sleep 2
dismiss_anr
$ADB shell screencap -p /sdcard/android-lex-normalized.png
$ADB pull /sdcard/android-lex-normalized.png "${RESULTS_DIR}/android-lex-normalized.png"
echo "  normalized tab saved"

echo ""
echo "=== Android Lex full-stack test complete (expected: Not Verified) ==="
echo "Results in: ${RESULTS_DIR}/"
