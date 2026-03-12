#!/usr/bin/env bash
# run-ofsi-test.sh — Full-stack OFSI sanctions licence verification test.
#
# Albion Capital Management's OFSI licence (fictional).
# Authority chain: ofsi.hm-treasury.gov.uk → gov.uk (root).
# The claim hash is seeded, so verification should succeed with full chain.
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
    if curl -sk --resolve ofsi.hm-treasury.gov.uk:443:127.0.0.1 \
        https://ofsi.hm-treasury.gov.uk/licences/verification-meta.json > /dev/null 2>&1; then
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

echo "=== Seeding authority chain + claim ==="
bash "${SCRIPT_DIR}/harness/seed-chain-ofsi.sh"

echo "=== Verifying (smoke test) ==="
CLAIM_HASH=$(printf 'HM TREASURY - OFSI\nOffice of Financial Sanctions Implementation\nLICENCE UNDER THE RUSSIA (SANCTIONS) (EU EXIT) REGULATIONS 2019\nLicence Reference: INT/2026/1847293\nDate of Issue: 14 March 2026\nLicence Holder: Albion Capital Management LLP\nDesignated Person: [Name redacted - see restricted annex]\nAuthorised Activity:\nPayment of legal fees to Clifford Chance LLP\nMaximum Amount: GBP 75,000.00\nExpiry: 14 June 2026\nSubject to conditions in the attached annex.\nIssued by: Financial Sanctions Officer, OFSI' | sha256sum | cut -d' ' -f1)
RESULT=$(curl -sk --resolve ofsi.hm-treasury.gov.uk:443:127.0.0.1 "https://ofsi.hm-treasury.gov.uk/licences/${CLAIM_HASH}")
STATUS=$(echo "$RESULT" | jq -r '.status // empty' 2>/dev/null || echo "$RESULT")
if [ "$STATUS" = "verified" ]; then
    echo "Smoke test passed: claim hash returns status verified"
else
    echo "Smoke test FAILED: expected status verified, got '$RESULT'"
    exit 1
fi

echo "=== Running Playwright test ==="
cd "${SCRIPT_DIR}/.."
if [ "$USE_XVFB" = true ]; then
    xvfb-run --auto-servernum --server-args='-screen 0 1920x1080x24' \
        npx playwright test \
        full-stack-tests/chrome-extension/ofsi-licence.spec.ts \
        --config=full-stack-tests/chrome-extension/playwright.config.ts
else
    npx playwright test \
        full-stack-tests/chrome-extension/ofsi-licence.spec.ts \
        --config=full-stack-tests/chrome-extension/playwright.config.ts
fi

echo "=== Test complete — OFSI licence verified! ==="
