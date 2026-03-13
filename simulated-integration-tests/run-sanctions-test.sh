#!/usr/bin/env bash
# run-sanctions-test.sh — Full-stack test for sanctions screening attestation.
#
# Tests a fictitious compliance firm's screening attestation verified through
# an FCA → gov.uk authority chain. Demonstrates financial crime compliance
# document verification.
#
# Authority chain:
#   compliance.hartwell-beck.co.uk/sanctions → fca.org.uk/register → gov.uk/v1
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

echo "=== Starting backend + Caddy ==="
$COMPOSE -f "$COMPOSE_FILE" up --build -d

echo "=== Waiting for Caddy (HTTPS on 443) ==="
for i in $(seq 1 30); do
    if curl -sk --resolve compliance.hartwell-beck.co.uk:443:127.0.0.1 \
        https://compliance.hartwell-beck.co.uk/sanctions/verification-meta.json > /dev/null 2>&1; then
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

# 1. Hartwell Beck's meta hash → stored so FCA can confirm authorization
HB_META_HASH=$(meta_hash "${META_DIR}/compliance.hartwell-beck.co.uk/sanctions/verification-meta.json")
seed "$HB_META_HASH" '{"status":"verified"}' "Hartwell Beck meta (authorized by fca.org.uk)"

# 2. FCA's meta hash → stored so gov.uk can confirm authorization
FCA_META_HASH=$(meta_hash "${META_DIR}/fca.org.uk/register/verification-meta.json")
seed "$FCA_META_HASH" '{"status":"verified"}' "FCA meta (authorized by gov.uk)"

# 3. Gov.uk's meta hash → root authority
GOV_META_HASH=$(meta_hash "${META_DIR}/gov.uk/v1/verification-meta.json")
seed "$GOV_META_HASH" '{"status":"verified"}' "Gov.uk meta (root authority)"

echo ""
echo "=== Seeding claim hash ==="

# Compute hash using the same normalizeText function the extension uses
CLAIM_HASH=$(node -e "
const { normalizeText } = require('./public/normalize.js');
const crypto = require('crypto');
const text = 'HARTWELL BECK COMPLIANCE LTD\nSANCTIONS SCREENING ATTESTATION\nScreening ID: HB-2026-4419-KR\nSubject: AURORA MARITIME HOLDINGS LTD\nJurisdiction: Cyprus\nEntity Ref: CY-33810045\nDate: 12 MAR 2026 09:15:03 UTC\nResult: NO MATCH FOUND\nLists screened:\n- OFAC SDN (ver 12-MAR-2026)\n- UN Consolidated Sanctions (ver 11-MAR-2026)\n- EU Consolidated List (ver 12-MAR-2026)\n- UK OFSI Consolidated (ver 12-MAR-2026)\nMatch threshold: 85% fuzzy\nScreening officer: R. Okonkwo';
const normalized = normalizeText(text);
const hash = crypto.createHash('sha256').update(normalized).digest('hex');
process.stdout.write(hash);
")
seed "$CLAIM_HASH" '{"status":"verified"}' "Sanctions screening claim"

echo ""
echo "=== Verifying chain (smoke test) ==="
RESULT=$(curl -sk --resolve compliance.hartwell-beck.co.uk:443:127.0.0.1 "https://compliance.hartwell-beck.co.uk/sanctions/${CLAIM_HASH}")
STATUS=$(echo "$RESULT" | jq -r '.status // empty' 2>/dev/null || echo "$RESULT")
if [ "$STATUS" = "verified" ]; then
    echo "Smoke test passed: claim hash returns status verified"
else
    echo "Smoke test FAILED: expected status verified, got '$RESULT'"
    exit 1
fi

echo ""
echo "=== Meta hashes ==="
echo "  Hartwell Beck: ${HB_META_HASH}"
echo "  FCA:           ${FCA_META_HASH}"
echo "  Gov.uk:        ${GOV_META_HASH}"
echo "  Claim:         ${CLAIM_HASH}"

echo ""
echo "=== Running Playwright test ==="
cd "${SCRIPT_DIR}/.."
npx playwright test \
    simulated-integration-tests/chrome-extension/sanctions-screening.spec.ts \
    --config=simulated-integration-tests/chrome-extension/playwright.config.ts

echo "=== Test complete! ==="
