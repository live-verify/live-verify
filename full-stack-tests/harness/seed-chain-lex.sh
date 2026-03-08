#!/bin/sh
set -eu

# Seed NYPD authority chain ONLY — no claim hash.
# Lex Luthor's fake warrant card was never issued by NYPD, so the claim
# hash must NOT exist in the database. The authority chain is set up so
# the extension can walk it, but the final hash lookup returns 404.

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
echo "=== Seeding NYPD authority chain ==="

# 1. NYPD's meta hash → stored so ny.gov can confirm authorization
NYPD_META_HASH=$(meta_hash "${META_DIR}/ids.nypd.nyc.gov/2026/verification-meta.json")
seed "$NYPD_META_HASH" "OK" "NYPD meta (authorized by ny.gov)"

# 2. NY State's meta hash → root authority
NY_META_HASH=$(meta_hash "${META_DIR}/ny.gov/verified/verification-meta.json")
seed "$NY_META_HASH" "OK" "NY State meta (root authority)"

echo ""
echo "=== NOT seeding claim hash (Lex's ID was never issued) ==="

# For reference, this is what the claim hash WOULD be:
CLAIM_HASH=$(printf 'NEW YORK POLICE DEPARTMENT\nDETECTIVE\nLEX LUTHOR\nBadge: 84729' | sha256sum | cut -d' ' -f1)
echo "  Lex Luthor claim hash (NOT seeded): ${CLAIM_HASH}"

echo ""
echo "=== Seeding complete ==="
echo "  NYPD meta hash:    ${NYPD_META_HASH}"
echo "  NY State meta hash: ${NY_META_HASH}"
echo "  Claim hash (NOT in DB): ${CLAIM_HASH}"
