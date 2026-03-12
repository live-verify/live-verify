#!/usr/bin/env bash
# run-lex-test.sh — Full-stack FAILING verification test.
#
# Lex Luthor has a fake NYPD warrant card. The NYPD authority chain
# (ids.nypd.nyc.gov → ny.gov) is set up and valid, but the claim hash
# was never registered — because NYPD never issued this credential.
#
# The extension should walk the authority chain successfully but then
# fail on the hash lookup (404), showing verification failure.
#
# Works with docker compose or podman-compose.
#
# Prerequisites:
#   - Container runtime (docker or podman) with compose
#   - Rootless port 443: sysctl net.ipv4.ip_unprivileged_port_start=80
#   - Node.js + npx playwright
#   - jq, curl, sha256sum (for seeding)

set -euo pipefail

# If no DISPLAY is available (e.g. SSH session), try to inherit the host's
# Xwayland session before falling back to xvfb-run.
USE_XVFB=false
if [ -z "${DISPLAY:-}" ]; then
    # Look for Xwayland auth file (GNOME/Mutter on Wayland)
    XWAUTH=$(ls /run/user/$(id -u)/.mutter-Xwaylandauth.* 2>/dev/null | head -1)
    if [ -n "$XWAUTH" ] && DISPLAY=:0 XAUTHORITY="$XWAUTH" xdpyinfo &>/dev/null; then
        export DISPLAY=:0
        export XAUTHORITY="$XWAUTH"
        echo "Inherited host Xwayland session (DISPLAY=$DISPLAY)"
    elif command -v xvfb-run &>/dev/null; then
        USE_XVFB=true
        echo "No DISPLAY — will use xvfb-run for Playwright"
    else
        echo "Warning: no DISPLAY set and xvfb-run not found. Playwright may fail."
    fi
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
COMPOSE_FILE="${SCRIPT_DIR}/docker-compose.yml"

# Auto-detect compose command
if command -v docker &>/dev/null && docker compose version &>/dev/null 2>&1; then
    COMPOSE="docker compose"
elif command -v podman-compose &>/dev/null; then
    COMPOSE="podman-compose"
else
    echo "Error: no compose tool found (docker compose / podman-compose)"
    exit 1
fi
echo "Using: $COMPOSE"

function cleanup {
    echo "Tearing down containers..."
    $COMPOSE -f "$COMPOSE_FILE" down -v 2>/dev/null || true
}
trap cleanup EXIT

echo "=== Starting backend + Caddy ==="
$COMPOSE -f "$COMPOSE_FILE" up --build -d

echo "=== Waiting for Caddy (HTTPS on 443) ==="
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
bash "${SCRIPT_DIR}/harness/seed-chain-lex.sh"

echo "=== Verifying chain (smoke test — expecting 404 for claim) ==="
CLAIM_HASH=$(printf 'NEW YORK POLICE DEPARTMENT\nDETECTIVE\nLEX LUTHOR\nBadge: 84729' | sha256sum | cut -d' ' -f1)
HTTP_CODE=$(curl -sk -o /dev/null -w '%{http_code}' --resolve ids.nypd.nyc.gov:443:127.0.0.1 "https://ids.nypd.nyc.gov/2026/${CLAIM_HASH}")
if [ "$HTTP_CODE" = "404" ]; then
    echo "Smoke test passed: claim hash returns 404 (never issued)"
else
    echo "Smoke test FAILED: expected 404, got HTTP ${HTTP_CODE}"
    exit 1
fi

echo "=== Running Playwright test ==="
cd "${SCRIPT_DIR}/.."
if [ "$USE_XVFB" = true ]; then
    xvfb-run --auto-servernum --server-args='-screen 0 1920x1080x24' \
        npx playwright test \
        simulated-integration-tests/chrome-extension/lex-verification.spec.ts \
        --config=simulated-integration-tests/chrome-extension/playwright.config.ts
else
    npx playwright test \
        simulated-integration-tests/chrome-extension/lex-verification.spec.ts \
        --config=simulated-integration-tests/chrome-extension/playwright.config.ts
fi

echo "=== Test complete — fake ID correctly rejected! ==="
