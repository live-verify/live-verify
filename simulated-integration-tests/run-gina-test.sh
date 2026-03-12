#!/usr/bin/env bash
# run-gina-test.sh — Full-stack test with containerized backend + Caddy TLS.
#
# Starts backend tiers + Caddy in containers, seeds authority chain, then runs
# Playwright on the host with the real Chrome extension against real domain
# names (midsomer.police.uk, policing.gov.uk, gov.uk) on HTTPS/443.
#
# Works with docker compose or podman-compose.
#
# Prerequisites:
#   - Container runtime (docker or podman) with compose
#   - Rootless port 443: sysctl net.ipv4.ip_unprivileged_port_start=80
#   - Node.js + npx playwright
#   - jq, curl, sha256sum (for seeding)

set -euo pipefail

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
bash "${SCRIPT_DIR}/harness/seed-chain-host.sh"

echo "=== Verifying chain (smoke test) ==="
CLAIM_HASH=$(printf 'MIDSOMER CONSTABULARY\nPOLICE OFFICER\nDETECTIVE GINA COULBY\nSalt: 7k3m9x2p' | sha256sum | cut -d' ' -f1)
RESULT=$(curl -sk --resolve midsomer.police.uk:443:127.0.0.1 "https://midsomer.police.uk/id/${CLAIM_HASH}")
STATUS=$(echo "$RESULT" | jq -r '.status // empty' 2>/dev/null || echo "$RESULT")
if [ "$STATUS" = "verified" ]; then
    echo "Smoke test passed: claim hash returns status verified"
else
    echo "Smoke test FAILED: expected status verified, got '$RESULT'"
    exit 1
fi

echo "=== Running Playwright test ==="
cd "${SCRIPT_DIR}/.."
npx playwright test \
    simulated-integration-tests/chrome-extension/gina-verification.spec.ts \
    --config=simulated-integration-tests/chrome-extension/playwright.config.ts

echo "=== Test complete! ==="
