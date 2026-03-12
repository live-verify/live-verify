#!/usr/bin/env bash
# run-android-test.sh — Full-stack test: Android emulator against containerized backend.
#
# Starts backend + Caddy in containers, seeds authority chain, builds debug APK,
# installs on emulator, launches with text-paste intent + DNS overrides, captures screenshot.
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
#   - jq, curl, sha256sum, python3 + Pillow (for headshot encoding)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FST_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_DIR="$(cd "$FST_DIR/.." && pwd)"
ANDROID_DIR="${PROJECT_DIR}/apps/android"
RESULTS_DIR="${FST_DIR}/results"

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

echo "=== Starting backend + Caddy ==="
$COMPOSE -f "$COMPOSE_FILE" up --build -d

echo "=== Waiting for Caddy ==="
for i in $(seq 1 30); do
    if curl -sk --resolve midsomer.police.uk:443:127.0.0.1 \
        https://midsomer.police.uk/id/verification-meta.json > /dev/null 2>&1; then
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

echo "=== Seeding authority chain ==="
bash "${FST_DIR}/harness/seed-chain-host.sh"

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

# ── 5. Launch with text-paste intent + DNS overrides ──────────────

echo "=== Pushing warrant card image to emulator ==="
WARRANT_CARD="${FST_DIR}/fixtures/gina-warrant-card.png"
# Push to app's private files dir (scoped storage on API 30+ blocks /sdcard reads)
APP_FILES="/data/data/com.liveverify.app/files"
$ADB push "$WARRANT_CARD" /data/local/tmp/gina-warrant-card.png
$ADB shell run-as com.liveverify.app mkdir -p "$APP_FILES"
$ADB shell run-as com.liveverify.app cp /data/local/tmp/gina-warrant-card.png "$APP_FILES/"
IMAGE_PATH="${APP_FILES}/gina-warrant-card.png"

echo "=== Launching verification (image OCR mode) ==="
# 10.0.2.2 is the Android emulator's alias for the host machine's loopback.
# The app's debug mode uses these DNS overrides in OkHttpClient and trusts
# all TLS certificates, bypassing both DNS resolution and Caddy's self-signed certs.
DNS_OVERRIDES="midsomer.police.uk=10.0.2.2,policing.gov.uk=10.0.2.2,gov.uk=10.0.2.2"

# Launch with image path — ML Kit OCR runs on the warrant card image,
# exercising the full camera→OCR→normalize→hash→verify pipeline.
$ADB shell am start \
    -n com.liveverify.app/.MainActivity \
    --es com.liveverify.app.VERIFY_IMAGE "$IMAGE_PATH" \
    --es com.liveverify.app.DNS_OVERRIDES "$DNS_OVERRIDES"

# Wait for verification to complete (ML Kit model download + OCR + network + chain walk)
# First run needs extra time for ML Kit to download the text recognition model.
echo "Waiting for verification to complete..."
sleep 35

# Dismiss ANR dialogs (swiftshader GPU triggers "System UI isn't responding").
# Uses uiautomator to find and tap the "Wait" button precisely.
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

# Main result (Captured tab is already selected by default)
$ADB shell screencap -p /sdcard/android-gina-result.png
$ADB pull /sdcard/android-gina-result.png "${RESULTS_DIR}/android-gina-result.png"
echo "  result screenshot saved"

# Captured tab (shows the warrant card image that was OCR'd)
dismiss_anr
$ADB shell screencap -p /sdcard/android-gina-captured.png
$ADB pull /sdcard/android-gina-captured.png "${RESULTS_DIR}/android-gina-captured.png"
echo "  captured tab saved"

# Use uiautomator to find and tap tabs by text content.
tap_tab() {
    local tab_text="$1"
    $ADB shell uiautomator dump /sdcard/ui.xml 2>/dev/null
    # Pull the XML and parse locally for reliable grep
    $ADB pull /sdcard/ui.xml /tmp/android-ui.xml 2>/dev/null
    # Find the node with matching text attribute, extract its bounds
    local bounds=$(grep -oP "text=\"${tab_text}\"[^>]*bounds=\"\K[^\"]+" /tmp/android-ui.xml 2>/dev/null | head -1)
    if [ -n "$bounds" ]; then
        # bounds format: [x1,y1][x2,y2]
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
        # Dump file for debugging
        grep -o 'text="[^"]*"' /tmp/android-ui.xml 2>/dev/null | head -20 || true
    fi
}

# Tap "Extracted" tab
tap_tab "Extracted"
sleep 2
dismiss_anr
$ADB shell screencap -p /sdcard/android-gina-extracted.png
$ADB pull /sdcard/android-gina-extracted.png "${RESULTS_DIR}/android-gina-extracted.png"
echo "  extracted tab saved"

# Tap "Normalized" tab
tap_tab "Normalized"
sleep 2
dismiss_anr
$ADB shell screencap -p /sdcard/android-gina-normalized.png
$ADB pull /sdcard/android-gina-normalized.png "${RESULTS_DIR}/android-gina-normalized.png"
echo "  normalized tab saved"

# Optional: short video capture
echo "=== Recording demo video (12 seconds) ==="
$ADB shell am force-stop com.liveverify.app
sleep 1
$ADB shell screenrecord --time-limit 12 /sdcard/android-gina-demo.mp4 &
RECORD_PID=$!
sleep 1
$ADB shell am start \
    -n com.liveverify.app/.MainActivity \
    --es com.liveverify.app.VERIFY_IMAGE "$IMAGE_PATH" \
    --es com.liveverify.app.DNS_OVERRIDES "$DNS_OVERRIDES"
wait $RECORD_PID 2>/dev/null || true
$ADB pull /sdcard/android-gina-demo.mp4 "${RESULTS_DIR}/android-gina-demo.mp4" 2>/dev/null || \
    echo "Video pull failed (may not be ready yet)"
echo "Video saved: ${RESULTS_DIR}/android-gina-demo.mp4"

echo ""
echo "=== Android full-stack test complete! ==="
echo "Results in: ${RESULTS_DIR}/"
