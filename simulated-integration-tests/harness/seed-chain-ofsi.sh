#!/bin/sh
set -eu

# Seed OFSI licence authority chain + claim hash into tier3 via tier2 write port.
# Chain: ofsi.hm-treasury.gov.uk → gov.uk (root)

TIER2_WRITE="${TIER2_WRITE:-http://localhost:8081}"
META_DIR="${META_DIR:-$(dirname "$0")/../meta}"

echo "=== Waiting for tier2 write port ==="
for i in $(seq 1 30); do
    if curl -s "${TIER2_WRITE}/healthz" > /dev/null 2>&1; then
        echo "tier2 ready."
        break
    fi
    if [ "$i" -eq 30 ]; then echo "Timeout waiting for tier2"; exit 1; fi
    sleep 1
done

# Compute canonical JSON hash for a meta file.
meta_hash() {
    jq -c . < "$1" | tr -d '\n' | sha256sum | cut -d' ' -f1
}

# Seed a hash with a payload.
seed() {
    local hash="$1" payload="$2" desc="$3"
    code=$(curl -s -o /dev/null -w '%{http_code}' -X PUT "${TIER2_WRITE}/v/${hash}" -d "$payload")
    echo "  ${desc}: ${hash} -> HTTP ${code}"
}

echo ""
echo "=== Seeding authority chain ==="

# 1. OFSI's meta hash → stored so gov.uk can confirm authorization
OFSI_META_HASH=$(meta_hash "${META_DIR}/ofsi.hm-treasury.gov.uk/licences/verification-meta.json")
seed "$OFSI_META_HASH" '{"status":"verified"}' "OFSI meta (authorized by gov.uk)"

# 2. Gov.uk's meta hash → root authority (may already be seeded by another test)
GOVUK_META_HASH=$(meta_hash "${META_DIR}/gov.uk/v1/verification-meta.json")
seed "$GOVUK_META_HASH" '{"status":"verified"}' "Gov.uk meta (root authority)"

echo ""
echo "=== Seeding claim hash ==="

# OFSI licence claim text (must match what PDF.js text layer produces after normalization).
CLAIM_HASH=$(printf 'HM TREASURY - OFSI\nOffice of Financial Sanctions Implementation\nLICENCE UNDER THE RUSSIA (SANCTIONS) (EU EXIT) REGULATIONS 2019\nLicence Reference: INT/2026/1847293\nDate of Issue: 14 March 2026\nLicence Holder: Albion Capital Management LLP\nDesignated Person: [Name redacted - see restricted annex]\nAuthorised Activity:\nPayment of legal fees to Clifford Chance LLP\nMaximum Amount: GBP 75,000.00\nExpiry: 14 June 2026\nSubject to conditions in the attached annex.\nIssued by: Financial Sanctions Officer, OFSI' | sha256sum | cut -d' ' -f1)

seed "$CLAIM_HASH" '{"status":"verified"}' "OFSI licence (Albion Capital Management)"

echo ""
echo "=== Seeding complete ==="
echo "  OFSI meta hash:   ${OFSI_META_HASH}"
echo "  Gov.uk meta hash: ${GOVUK_META_HASH}"
echo "  Claim hash:       ${CLAIM_HASH}"
