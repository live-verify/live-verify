#!/usr/bin/env bash
set -euo pipefail

# Integration test: seed demo hashes and verify through full 3-tier chain.
# Requires docker compose up to be running.

BASE_URL="${BASE_URL:-http://localhost:8080}"
TIER2_MGMT="${TIER2_MGMT:-http://localhost:8081}"
SEED_DIR="${SEED_DIR:-../../public/c}"

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

pass=0
fail=0

assert_eq() {
    local desc="$1" expected="$2" actual="$3"
    if [ "$expected" = "$actual" ]; then
        echo -e "${GREEN}PASS${NC}: $desc"
        ((pass++))
    else
        echo -e "${RED}FAIL${NC}: $desc (expected '$expected', got '$actual')"
        ((fail++))
    fi
}

assert_status() {
    local desc="$1" expected_code="$2" url="$3"
    shift 3
    local code
    code=$(curl -s -o /dev/null -w '%{http_code}' "$@" "$url")
    assert_eq "$desc" "$expected_code" "$code"
}

echo "=== Waiting for services ==="
for i in $(seq 1 30); do
    if curl -s "${BASE_URL}/healthz" > /dev/null 2>&1; then
        echo "Services ready."
        break
    fi
    if [ "$i" -eq 30 ]; then
        echo "Timeout waiting for services"
        exit 1
    fi
    sleep 1
done

echo ""
echo "=== Seeding demo hashes via Tier 2 write port ==="
for dir in "$SEED_DIR"/*/; do
    hash=$(basename "$dir")
    [ "$hash" = "verification-meta.json" ] && continue
    [ ! -f "$dir/index.html" ] && continue
    payload=$(cat "$dir/index.html" | tr -d '[:space:]')
    code=$(curl -s -o /dev/null -w '%{http_code}' -X PUT "${TIER2_MGMT}/v/${hash}" -d "$payload")
    echo "  Seeded $hash -> $payload (HTTP $code)"
done

echo ""
echo "=== Testing READ path (Tier 1 -> Tier 2 -> Tier 3) ==="

# Test known OK hashes
for hash in \
    09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f031 \
    1cddfbb2adfa13e4562d274b59e56b946f174a0feb566622dd67a4880cf0b223 \
    f10573d8517edbfa04623d6a255402816d42b962dce13a1dc2b6427c4539711c; do
    body=$(curl -s "${BASE_URL}/c/${hash}")
    assert_eq "GET /c/$hash body" "OK" "$body"
done

# Test REVOKED hashes
for hash in \
    949cdf7a5ee604e1dc01403eb898b49f66dd9e4d5a248a97eb7971a392bc1aec \
    b767b0558ebff1c2bc911fa69ce4e63fd7c2ba7ff7a540c6fa257a8fe6628f0a; do
    body=$(curl -s "${BASE_URL}/c/${hash}")
    assert_eq "GET /c/$hash body" "REVOKED" "$body"
done

echo ""
echo "=== Testing error cases ==="

# 404 for unknown hash
assert_status "GET unknown hash -> 404" "404" \
    "${BASE_URL}/c/0000000000000000000000000000000000000000000000000000000000000000"

# 400 for invalid hash
assert_status "GET invalid hash -> 400" "400" \
    "${BASE_URL}/c/badhash"

# 405 for POST
assert_status "POST -> 405" "405" \
    "${BASE_URL}/c/09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f031" \
    -X POST

# Path-agnostic: different prefix should work
body=$(curl -s "${BASE_URL}/claims/09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f031")
assert_eq "GET /claims/{hash} (path-agnostic)" "OK" "$body"

echo ""
echo "=== Results: $pass passed, $fail failed ==="
[ "$fail" -eq 0 ] || exit 1
