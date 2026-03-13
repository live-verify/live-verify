#!/usr/bin/env bash
# run-revoked-reference-test.sh — Full-stack test for revoked employment reference.
#
# Tests that a withdrawn employment reference shows REVOKED status.
# Uses the shared Docker backend (tier1/tier2/tier3 + Caddy).
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
    if curl -sk --resolve hr.meridian-consulting.com:443:127.0.0.1 \
        https://hr.meridian-consulting.com/refs/verification-meta.json > /dev/null 2>&1; then
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

echo "=== Seeding revoked reference hash ==="
# Compute hash using the same normalizeText function the extension uses
CLAIM_HASH=$(node -e "
const { normalizeText } = require('./public/normalize.js');
const crypto = require('crypto');
const text = 'MERIDIAN CONSULTING GROUP\nEMPLOYMENT REFERENCE\nRef: MCG-EMP-2024-0847\nThis confirms that\nSARAH CHEN\nwas employed as Senior Project Manager\nfrom March 2021 to November 2023.\nDuring her tenure, Ms. Chen demonstrated\nstrong leadership and project delivery skills.\nIssued: 15 January 2024\nHR Director: James Morton';
const normalized = normalizeText(text);
const hash = crypto.createHash('sha256').update(normalized).digest('hex');
process.stdout.write(hash);
")
echo "Claim hash: $CLAIM_HASH"

# Seed hash with revoked status via tier2 write port
RESPONSE='{"status":"revoked","message":"Reference withdrawn — post-departure misconduct discovered"}'
curl -s -X PUT "http://127.0.0.1:8081/v/${CLAIM_HASH}" \
    -H "Content-Type: application/json" \
    -d "$RESPONSE"
echo "Seeded revoked status for hash $CLAIM_HASH"

echo "=== Verifying seed (smoke test) ==="
RESULT=$(curl -sk --resolve hr.meridian-consulting.com:443:127.0.0.1 "https://hr.meridian-consulting.com/refs/${CLAIM_HASH}")
STATUS=$(echo "$RESULT" | jq -r '.status // empty' 2>/dev/null || echo "$RESULT")
if [ "$STATUS" = "revoked" ]; then
    echo "Smoke test passed: claim hash returns status revoked"
else
    echo "Smoke test FAILED: expected status revoked, got '$RESULT'"
    exit 1
fi

echo "=== Running Playwright test ==="
cd "${SCRIPT_DIR}/.."
npx playwright test \
    simulated-integration-tests/chrome-extension/revoked-reference.spec.ts \
    --config=simulated-integration-tests/chrome-extension/playwright.config.ts

echo "=== Test complete! ==="
