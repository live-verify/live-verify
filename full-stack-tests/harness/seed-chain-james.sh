#!/bin/sh
set -eu

# Seed bank statement authority chain + claim hash into tier3 via tier2 write port.
# Chain: meridian-national.bank.us → fdic.gov → treasury.gov (root)

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

# 1. Meridian National Bank's meta hash → stored so fdic.gov can confirm authorization
BANK_META_HASH=$(meta_hash "${META_DIR}/meridian-national.bank.us/statements/verification-meta.json")
seed "$BANK_META_HASH" '{"status":"verified"}' "Meridian National Bank meta (authorized by fdic.gov)"

# 2. FDIC's meta hash → stored so treasury.gov can confirm authorization
FDIC_META_HASH=$(meta_hash "${META_DIR}/fdic.gov/verified/verification-meta.json")
seed "$FDIC_META_HASH" '{"status":"verified"}' "FDIC meta (authorized by treasury.gov)"

# 3. Treasury's meta hash → root authority
TREASURY_META_HASH=$(meta_hash "${META_DIR}/treasury.gov/v1/verification-meta.json")
seed "$TREASURY_META_HASH" '{"status":"verified"}' "US Treasury meta (root authority)"

echo ""
echo "=== Seeding claim hash ==="

# James Whitfield's bank statement claim text (must match fixture HTML exactly).
CLAIM_HASH=$(printf 'Account Holder: James R. Whitfield\nAccount Number: 7294-0038-4821\nRouting Number: 091000019\nStatement Period: 1 March 2025 - 31 March 2025\nOpening Balance: $12,450.30\nDate Description Amount\n01/03 Direct Deposit - Employer $4,200.00\n05/03 Electric Company Payment -$142.50\n08/03 Grocery Store -$87.23\n12/03 Online Transfer In $500.00\n15/03 Insurance Premium -$325.00\n18/03 Restaurant -$64.80\n22/03 ATM Withdrawal -$200.00\n25/03 Subscription Service -$14.99\n28/03 Gas Station -$52.15\n31/03 Interest Earned $8.42\nClosing Balance: $16,272.05' | sha256sum | cut -d' ' -f1)

seed "$CLAIM_HASH" '{"status":"verified"}' "James Whitfield bank statement"

echo ""
echo "=== Seeding complete ==="
echo "  Bank meta hash:     ${BANK_META_HASH}"
echo "  FDIC meta hash:     ${FDIC_META_HASH}"
echo "  Treasury meta hash: ${TREASURY_META_HASH}"
echo "  Claim hash:         ${CLAIM_HASH}"
