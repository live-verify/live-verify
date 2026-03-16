#!/usr/bin/env bash
# run-coffee-test.sh — Full-stack test for coffee shop receipt verification.
#
# Tests a fictitious UK coffee shop receipt verified through an HMRC VAT → gov.uk
# authority chain. Simulates a camera-app scanning a photographed receipt.
#
# Authority chain:
#   r.the-daily-grind.co.uk → hmrc.gov.uk/vat → gov.uk/v1
#
# Prerequisites:
#   - Container runtime (docker or podman) with compose
#   - Rootless port 443: sysctl net.ipv4.ip_unprivileged_port_start=80
#   - Node.js + npx playwright
#   - jq, curl, sha256sum (for seeding)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
COMPOSE_FILE="${SCRIPT_DIR}/docker-compose.yml"
META_DIR="${SCRIPT_DIR}/meta"

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

# Preemptive cleanup of stale containers
$COMPOSE -f "$COMPOSE_FILE" down -v 2>/dev/null || true

echo "=== Starting backend + Caddy ==="
$COMPOSE -f "$COMPOSE_FILE" up --build -d

echo "=== Waiting for Caddy (HTTPS on 443) ==="
for i in $(seq 1 30); do
    if curl -sk --resolve r.the-daily-grind.co.uk:443:127.0.0.1 \
        https://r.the-daily-grind.co.uk/verification-meta.json > /dev/null 2>&1; then
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

# Wait for tier2 write port
echo "=== Waiting for tier2 write port ==="
for i in $(seq 1 30); do
    if curl -s http://localhost:8081/healthz > /dev/null 2>&1; then
        echo "tier2 ready."
        break
    fi
    if [ "$i" -eq 30 ]; then echo "Timeout waiting for tier2"; exit 1; fi
    sleep 1
done

# Helper: compute canonical JSON hash for a meta file
meta_hash() {
    jq -c . < "$1" | tr -d '\n' | sha256sum | cut -d' ' -f1
}

# Helper: seed a hash with a payload
seed() {
    local hash="$1" payload="$2" desc="$3"
    code=$(curl -s -o /dev/null -w '%{http_code}' -X PUT "http://127.0.0.1:8081/v/${hash}" -d "$payload")
    echo "  ${desc}: ${hash} -> HTTP ${code}"
}

echo ""
echo "=== Seeding authority chain ==="

# 1. Daily Grind's meta hash → stored so HMRC can confirm VAT registration
DG_META_HASH=$(meta_hash "${META_DIR}/r.the-daily-grind.co.uk/verification-meta.json")
seed "$DG_META_HASH" '{"status":"verified"}' "Daily Grind meta (authorized by hmrc.gov.uk)"

# 2. HMRC VAT's meta hash → stored so gov.uk can confirm authorization
HMRC_META_HASH=$(meta_hash "${META_DIR}/hmrc.gov.uk/vat/verification-meta.json")
seed "$HMRC_META_HASH" '{"status":"verified"}' "HMRC VAT meta (authorized by gov.uk)"

# 3. Gov.uk's meta hash → root authority
GOV_META_HASH=$(meta_hash "${META_DIR}/gov.uk/v1/verification-meta.json")
seed "$GOV_META_HASH" '{"status":"verified"}' "Gov.uk meta (root authority)"

echo ""
echo "=== Seeding claim hash ==="

# Compute hash using the same normalizeText function the extension uses
CLAIM_HASH=$(node -e "
const { normalizeText } = require('./public/normalize.js');
const crypto = require('crypto');
const text = '8 Market Square\nHenley-on-Thames RG9 2AA\nReceipt: DG-20260315-0017\nDate: 15/03/2026 08:23\nFlat White                  £3.40\nAlmond Croissant            £3.25\nSUBTOTAL:                   £6.65\nVAT @ 20%:                  £1.11\nTOTAL:                      £6.65\nVisa contactless ****3094\nAuth: 718204';
const normalized = normalizeText(text);
const hash = crypto.createHash('sha256').update(normalized).digest('hex');
process.stdout.write(hash);
")
seed "$CLAIM_HASH" '{"status":"verified","message":"Send to Expensify?"}' "Daily Grind receipt"

echo ""
echo "=== Verifying (smoke test) ==="
RESULT=$(curl -sk --resolve r.the-daily-grind.co.uk:443:127.0.0.1 "https://r.the-daily-grind.co.uk/${CLAIM_HASH}")
STATUS=$(echo "$RESULT" | jq -r '.status // empty' 2>/dev/null || echo "$RESULT")
if [ "$STATUS" = "verified" ]; then
    echo "Smoke test passed: claim hash returns status verified"
else
    echo "Smoke test FAILED: expected status verified, got '$RESULT'"
    exit 1
fi

echo ""
echo "=== Hashes ==="
echo "  Daily Grind meta: ${DG_META_HASH}"
echo "  HMRC VAT:         ${HMRC_META_HASH}"
echo "  Gov.uk:           ${GOV_META_HASH}"
echo "  Claim:            ${CLAIM_HASH}"

echo ""
echo "=== Running Playwright test ==="
cd "${SCRIPT_DIR}/.."
npx playwright test \
    simulated-integration-tests/chrome-extension/coffee-shop-receipt.spec.ts \
    --config=simulated-integration-tests/chrome-extension/playwright.config.ts

echo "=== Test complete! ==="
