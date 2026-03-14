#!/usr/bin/env bash
# run-scottish-solicitor-test.sh — Full-stack test for Scottish solicitor practising certificate
# and firm registration.
#
# Tests a fictitious Edinburgh law firm with TWO separate verification endpoints:
#   1. macleod-fraser.co.uk/certs — individual practising certificates (Fiona Macleod)
#   2. macleod-fraser.co.uk/firm  — firm/partnership registration (Macleod Fraser & Partners)
#
# Both go through the same devolved Scottish authority chain:
#   Law Society of Scotland (lawscot.org.uk) → Scottish Government (gov.scot)
#
# The Law Society registers individuals and firms independently:
#   - A solicitor holds a practising certificate regardless of which firm they're at
#   - A firm is registered regardless of which individual solicitors work there
#
# Demonstrates that authority chains follow jurisdictional oversight,
# not DNS hierarchy — lawscot.org.uk is a .org.uk domain but is
# authorizedBy gov.scot (Scottish Government), not gov.uk.
#
# Authority chains:
#   macleod-fraser.co.uk/certs → lawscot.org.uk/register → gov.scot/v1
#   macleod-fraser.co.uk/firm  → lawscot.org.uk/register → gov.scot/v1
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
    if curl -sk --resolve macleod-fraser.co.uk:443:127.0.0.1 \
        https://macleod-fraser.co.uk/certs/verification-meta.json > /dev/null 2>&1; then
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

# 1. Macleod Fraser certs meta hash → stored so Law Society can confirm registration
MF_META_HASH=$(meta_hash "${META_DIR}/macleod-fraser.co.uk/certs/verification-meta.json")
seed "$MF_META_HASH" '{"status":"verified"}' "Macleod Fraser meta (authorized by lawscot.org.uk)"

# 2. Law Society of Scotland meta hash → stored so gov.scot can confirm authorization
LS_META_HASH=$(meta_hash "${META_DIR}/lawscot.org.uk/register/verification-meta.json")
seed "$LS_META_HASH" '{"status":"verified"}' "Law Society meta (authorized by gov.scot)"

# 3. Gov.scot meta hash → root authority
GS_META_HASH=$(meta_hash "${META_DIR}/gov.scot/v1/verification-meta.json")
seed "$GS_META_HASH" '{"status":"verified"}' "Gov.scot meta (root authority)"

echo ""
echo "=== Seeding firm meta hash ==="

# 4. Macleod Fraser firm meta hash → stored so Law Society can confirm firm registration
FIRM_META_HASH=$(meta_hash "${META_DIR}/macleod-fraser.co.uk/firm/verification-meta.json")
seed "$FIRM_META_HASH" '{"status":"verified"}' "Macleod Fraser firm meta (authorized by lawscot.org.uk)"

echo ""
echo "=== Seeding claim hashes ==="

# Individual practising certificate
CERT_HASH=$(node -e "
const { normalizeText } = require('./public/normalize.js');
const crypto = require('crypto');
const text = 'PRACTISING CERTIFICATE\nCertificate No: PC-2026-48291\n\nName: FIONA MACLEOD\nFirm: MACLEOD FRASER & PARTNERS\n14 Charlotte Square, Edinburgh EH2 4DJ\n\nAdmitted: 12 June 2009\nIssued: 01 November 2025, valid until: 31 October 2026\nAreas: Commercial property, Agricultural law, Crofting law\nPII: Confirmed, CPD: Up to date, Disciplinary: None';
const normalized = normalizeText(text);
const hash = crypto.createHash('sha256').update(normalized).digest('hex');
process.stdout.write(hash);
")
seed "$CERT_HASH" '{"status":"verified"}' "Practising certificate (Fiona Macleod)"

# Firm registration
FIRM_HASH=$(node -e "
const { normalizeText } = require('./public/normalize.js');
const crypto = require('crypto');
const text = 'REGISTERED LEGAL PRACTICE\nRegistration No: RLP-2026-03847\n\nFirm: MACLEOD FRASER & PARTNERS\nTrading as: Macleod Fraser & Partners\n14 Charlotte Square, Edinburgh EH2 4DJ\n\nPartnership, established 2003\nRegistered: 15 March 2003, renewed: 01 November 2025\nValid until: 31 October 2026\nPartners: 4, Solicitors: 11\nPII: Confirmed, Client account: Royal Bank of Scotland\nAML: Compliant';
const normalized = normalizeText(text);
const hash = crypto.createHash('sha256').update(normalized).digest('hex');
process.stdout.write(hash);
")
seed "$FIRM_HASH" '{"status":"verified"}' "Firm registration (Macleod Fraser & Partners)"

echo ""
echo "=== Verifying (smoke tests) ==="

# Practising certificate
RESULT=$(curl -sk --resolve macleod-fraser.co.uk:443:127.0.0.1 "https://macleod-fraser.co.uk/certs/${CERT_HASH}")
STATUS=$(echo "$RESULT" | jq -r '.status // empty' 2>/dev/null || echo "$RESULT")
if [ "$STATUS" = "verified" ]; then
    echo "Smoke test 1 passed: practising certificate hash returns verified"
else
    echo "Smoke test 1 FAILED: expected verified, got '$RESULT'"
    exit 1
fi

# Firm registration
RESULT=$(curl -sk --resolve macleod-fraser.co.uk:443:127.0.0.1 "https://macleod-fraser.co.uk/firm/${FIRM_HASH}")
STATUS=$(echo "$RESULT" | jq -r '.status // empty' 2>/dev/null || echo "$RESULT")
if [ "$STATUS" = "verified" ]; then
    echo "Smoke test 2 passed: firm registration hash returns verified"
else
    echo "Smoke test 2 FAILED: expected verified, got '$RESULT'"
    exit 1
fi

echo ""
echo "=== Hashes ==="
echo "  Macleod Fraser cert meta: ${MF_META_HASH}"
echo "  Macleod Fraser firm meta: ${FIRM_META_HASH}"
echo "  Law Society:              ${LS_META_HASH}"
echo "  Gov.scot:                 ${GS_META_HASH}"
echo "  Practising certificate:   ${CERT_HASH}"
echo "  Firm registration:        ${FIRM_HASH}"

echo ""
echo "=== Running Playwright test ==="
cd "${SCRIPT_DIR}/.."
npx playwright test \
    simulated-integration-tests/chrome-extension/scottish-solicitor.spec.ts \
    --config=simulated-integration-tests/chrome-extension/playwright.config.ts

echo "=== Test complete! ==="
