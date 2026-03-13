#!/usr/bin/env bash
# run-james-test.sh — Full-stack bank statement verification test.
#
# James Whitfield's bank statement from Meridian National Bank (fictional).
# Authority chain: meridian-national.bank.us → fdic.gov → treasury.gov (root).
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
    if curl -sk --resolve meridian-national.bank.us:443:127.0.0.1 \
        https://meridian-national.bank.us/statements/verification-meta.json > /dev/null 2>&1; then
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
bash "${SCRIPT_DIR}/harness/seed-chain-james.sh"

echo "=== Verifying (smoke test) ==="
CLAIM_HASH=$(printf 'Account Holder: James R. Whitfield\nAccount Number: 7294-0038-4821\nRouting Number: 091000019\nStatement Period: 1 March 2025 - 31 March 2025\nOpening Balance: $12,450.30\nDate Description Amount\n01/03 Direct Deposit - Employer $4,200.00\n05/03 Electric Company Payment -$142.50\n08/03 Grocery Store -$87.23\n12/03 Online Transfer In $500.00\n15/03 Insurance Premium -$325.00\n18/03 Restaurant -$64.80\n22/03 ATM Withdrawal -$200.00\n25/03 Subscription Service -$14.99\n28/03 Gas Station -$52.15\n31/03 Interest Earned $8.42\nClosing Balance: $16,272.05' | sha256sum | cut -d' ' -f1)
RESULT=$(curl -sk --resolve meridian-national.bank.us:443:127.0.0.1 "https://meridian-national.bank.us/statements/${CLAIM_HASH}")
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
        simulated-integration-tests/chrome-extension/james-bank-statement.spec.ts \
        --config=simulated-integration-tests/chrome-extension/playwright.config.ts
else
    npx playwright test \
        simulated-integration-tests/chrome-extension/james-bank-statement.spec.ts \
        --config=simulated-integration-tests/chrome-extension/playwright.config.ts
fi

echo "=== Test complete — bank statement verified! ==="
