#!/usr/bin/env bash
# run-all.sh — Run all simulated integration tests with a single container lifecycle.
#
# Starts backend + Caddy once, seeds all authority chains and claim hashes,
# then runs all Playwright specs sequentially. Tears down on exit.
#
# Prerequisites:
#   - Container runtime (docker or podman) with compose
#   - Rootless port 443: sysctl net.ipv4.ip_unprivileged_port_start=80
#   - Node.js + npx playwright
#   - jq, curl, sha256sum

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
COMPOSE_FILE="${SCRIPT_DIR}/docker-compose.yml"
META_DIR="${SCRIPT_DIR}/meta"
RESULTS_DIR="${SCRIPT_DIR}/../public/test-results"

mkdir -p "$RESULTS_DIR"

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
    echo ""
    echo "=== Tearing down containers ==="
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

echo "=== Waiting for tier2 write port ==="
for i in $(seq 1 30); do
    if curl -s http://localhost:8081/healthz > /dev/null 2>&1; then
        echo "tier2 ready."
        break
    fi
    if [ "$i" -eq 30 ]; then echo "Timeout waiting for tier2"; exit 1; fi
    sleep 1
done

# ─── Helpers ───────────────────────────────────────────────────────────────────

meta_hash() {
    jq -c . < "$1" | tr -d '\n' | sha256sum | cut -d' ' -f1
}

seed() {
    local hash="$1" payload="$2" desc="$3"
    code=$(curl -s -o /dev/null -w '%{http_code}' -X PUT "http://127.0.0.1:8081/v/${hash}" -d "$payload")
    echo "  ${desc}: ${hash:0:16}... -> HTTP ${code}"
}

# ─── Seed all authority chains ─────────────────────────────────────────────────

echo ""
echo "=== Seeding: Gina (Midsomer police) ==="
bash "${SCRIPT_DIR}/harness/seed-chain-host.sh"

echo ""
echo "=== Seeding: Lex (NYPD -ve case) ==="
bash "${SCRIPT_DIR}/harness/seed-chain-lex.sh"

echo ""
echo "=== Seeding: James (US bank statement) ==="
bash "${SCRIPT_DIR}/harness/seed-chain-james.sh"

echo ""
echo "=== Seeding: OFSI sanctions licence ==="
bash "${SCRIPT_DIR}/harness/seed-chain-ofsi.sh"

echo ""
echo "=== Seeding: Red Lion receipt (HMRC VAT chain) ==="
# Authority chain metas
RL_META_HASH=$(meta_hash "${META_DIR}/r.the-red-lion.co.uk/verification-meta.json")
seed "$RL_META_HASH" '{"status":"verified"}' "Red Lion meta"
HMRC_META_HASH=$(meta_hash "${META_DIR}/hmrc.gov.uk/vat/verification-meta.json")
seed "$HMRC_META_HASH" '{"status":"verified"}' "HMRC VAT meta"
GOVUK_META_HASH=$(meta_hash "${META_DIR}/gov.uk/v1/verification-meta.json")
seed "$GOVUK_META_HASH" '{"status":"verified"}' "Gov.uk meta"
# Claim hash
RL_CLAIM_HASH=$(node -e "
const { normalizeText } = require('./public/normalize.js');
const crypto = require('crypto');
const text = '17 High Street, Amersham HP7 0DJ\nReceipt: RL-20260314-0042\nDate: 14/03/2026 12:47\nTable: 6\nFish & Chips              £14.50\nPloughman\\'s Lunch          £11.95\nScampi & Chips             £13.50\nLondon Pride (pint)         £5.80\nDoom Bar (pint)             £5.60\nDiet Coke                   £2.95\n                           ------\nSUBTOTAL:                  £54.30\nVAT @ 20%:                  £9.05\nTOTAL:                     £54.30\nVisa contactless ****7821\nAuth: 493017';
const normalized = normalizeText(text);
const hash = crypto.createHash('sha256').update(normalized).digest('hex');
process.stdout.write(hash);
")
seed "$RL_CLAIM_HASH" '{"status":"verified"}' "Red Lion receipt claim"

echo ""
echo "=== Seeding: Scottish solicitor (Law Society → gov.scot) ==="
# Authority chain metas
MF_CERT_META_HASH=$(meta_hash "${META_DIR}/macleod-fraser.co.uk/certs/verification-meta.json")
seed "$MF_CERT_META_HASH" '{"status":"verified"}' "Macleod Fraser certs meta"
MF_FIRM_META_HASH=$(meta_hash "${META_DIR}/macleod-fraser.co.uk/firm/verification-meta.json")
seed "$MF_FIRM_META_HASH" '{"status":"verified"}' "Macleod Fraser firm meta"
LS_META_HASH=$(meta_hash "${META_DIR}/lawscot.org.uk/register/verification-meta.json")
seed "$LS_META_HASH" '{"status":"verified"}' "Law Society meta"
GS_META_HASH=$(meta_hash "${META_DIR}/gov.scot/v1/verification-meta.json")
seed "$GS_META_HASH" '{"status":"verified"}' "Gov.scot meta"
# Claim hashes
MF_CERT_HASH=$(node -e "
const { normalizeText } = require('./public/normalize.js');
const crypto = require('crypto');
const text = 'PRACTISING CERTIFICATE\nCertificate No: PC-2026-48291\n\nName: FIONA MACLEOD\nFirm: MACLEOD FRASER & PARTNERS\n14 Charlotte Square, Edinburgh EH2 4DJ\n\nAdmitted: 12 June 2009\nIssued: 01 November 2025, valid until: 31 October 2026\nAreas: Commercial property, Agricultural law, Crofting law\nPII: Confirmed, CPD: Up to date, Disciplinary: None';
const normalized = normalizeText(text);
const hash = crypto.createHash('sha256').update(normalized).digest('hex');
process.stdout.write(hash);
")
seed "$MF_CERT_HASH" '{"status":"verified"}' "Practising certificate (Fiona Macleod)"
MF_FIRM_HASH=$(node -e "
const { normalizeText } = require('./public/normalize.js');
const crypto = require('crypto');
const text = 'REGISTERED LEGAL PRACTICE\nRegistration No: RLP-2026-03847\n\nFirm: MACLEOD FRASER & PARTNERS\nTrading as: Macleod Fraser & Partners\n14 Charlotte Square, Edinburgh EH2 4DJ\n\nPartnership, established 2003\nRegistered: 15 March 2003, renewed: 01 November 2025\nValid until: 31 October 2026\nPartners: 4, Solicitors: 11\nPII: Confirmed, Client account: Royal Bank of Scotland\nAML: Compliant';
const normalized = normalizeText(text);
const hash = crypto.createHash('sha256').update(normalized).digest('hex');
process.stdout.write(hash);
")
seed "$MF_FIRM_HASH" '{"status":"verified"}' "Firm registration (Macleod Fraser)"

echo ""
echo "=== Seeding: Sanctions screening (FCA chain) ==="
HB_META_HASH=$(meta_hash "${META_DIR}/compliance.hartwell-beck.co.uk/sanctions/verification-meta.json")
seed "$HB_META_HASH" '{"status":"verified"}' "Hartwell-Beck meta"
FCA_META_HASH=$(meta_hash "${META_DIR}/fca.org.uk/register/verification-meta.json")
seed "$FCA_META_HASH" '{"status":"verified"}' "FCA meta"
# Gov.uk meta already seeded above
SANCTIONS_HASH=$(node -e "
const { normalizeText } = require('./public/normalize.js');
const crypto = require('crypto');
const text = 'HARTWELL BECK COMPLIANCE LTD\nSANCTIONS SCREENING ATTESTATION\nScreening ID: HB-2026-4419-KR\nSubject: AURORA MARITIME HOLDINGS LTD\nJurisdiction: Cyprus\nEntity Ref: CY-33810045\nDate: 12 MAR 2026 09:15:03 UTC\nResult: NO MATCH FOUND\nLists screened:\n- OFAC SDN (ver 12-MAR-2026)\n- UN Consolidated Sanctions (ver 11-MAR-2026)\n- EU Consolidated List (ver 12-MAR-2026)\n- UK OFSI Consolidated (ver 12-MAR-2026)\nMatch threshold: 85% fuzzy\nScreening officer: R. Okonkwo';
const normalized = normalizeText(text);
const hash = crypto.createHash('sha256').update(normalized).digest('hex');
process.stdout.write(hash);
")
seed "$SANCTIONS_HASH" '{"status":"verified"}' "Sanctions screening claim"

echo ""
echo "=== Seeding: Revoked reference ==="
REVOKED_HASH=$(node -e "
const { normalizeText } = require('./public/normalize.js');
const crypto = require('crypto');
const text = 'MERIDIAN CONSULTING GROUP\nEMPLOYMENT REFERENCE\nRef: MCG-EMP-2024-0847\nThis confirms that\nSARAH CHEN\nwas employed as Senior Project Manager\nfrom March 2021 to November 2023.\nDuring her tenure, Ms. Chen demonstrated\nstrong leadership and project delivery skills.\nIssued: 15 January 2024\nHR Director: James Morton';
const normalized = normalizeText(text);
const hash = crypto.createHash('sha256').update(normalized).digest('hex');
process.stdout.write(hash);
")
REVOKED_RESPONSE='{"status":"revoked","message":"Reference withdrawn — post-departure misconduct discovered"}'
seed "$REVOKED_HASH" "$REVOKED_RESPONSE" "Revoked reference (Sarah Chen)"

# ─── Run all Playwright tests ─────────────────────────────────────────────────

echo ""
echo "=== Running all Playwright tests ==="
cd "${SCRIPT_DIR}/.."

SPECS=(
    simulated-integration-tests/chrome-extension/gina-verification.spec.ts
    simulated-integration-tests/chrome-extension/lex-verification.spec.ts
    simulated-integration-tests/chrome-extension/james-bank-statement.spec.ts
    simulated-integration-tests/chrome-extension/ofsi-licence.spec.ts
    simulated-integration-tests/chrome-extension/sales-receipt.spec.ts
    simulated-integration-tests/chrome-extension/scottish-solicitor.spec.ts
    simulated-integration-tests/chrome-extension/sanctions-screening.spec.ts
    simulated-integration-tests/chrome-extension/revoked-reference.spec.ts
)

PASSED=0
FAILED=0
FAILURES=""

for spec in "${SPECS[@]}"; do
    name=$(basename "$spec" .spec.ts)
    echo ""
    echo "--- ${name} ---"
    if npx playwright test "$spec" \
        --config=simulated-integration-tests/chrome-extension/playwright.config.ts; then
        PASSED=$((PASSED + 1))
        echo "  ✓ ${name}"
    else
        FAILED=$((FAILED + 1))
        FAILURES="${FAILURES}\n  ✗ ${name}"
        echo "  ✗ ${name} FAILED"
    fi
done

echo ""
echo "=== Results ==="
echo "  Passed: ${PASSED}"
echo "  Failed: ${FAILED}"
if [ -n "$FAILURES" ]; then
    echo -e "  Failures:${FAILURES}"
fi

echo ""
echo "=== All tests complete! ==="
exit $FAILED
