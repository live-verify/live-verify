#!/usr/bin/env bash
set -euo pipefail

# Integration test: write path via Tier 2 management port.
# Requires docker compose up to be running.

BASE_URL="${BASE_URL:-http://localhost:8080}"
TIER2_MGMT="${TIER2_MGMT:-http://localhost:8081}"

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

TEST_HASH="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
TEST_PAYLOAD="WRITE_TEST_OK"

echo ""
echo "=== Test: PUT new hash via Tier 2 write port ==="
code=$(curl -s -o /dev/null -w '%{http_code}' -X PUT "${TIER2_MGMT}/v/${TEST_HASH}" -d "$TEST_PAYLOAD")
assert_eq "PUT new hash -> 200" "200" "$code"

echo ""
echo "=== Test: GET written hash through full read chain ==="
body=$(curl -s "${BASE_URL}/c/${TEST_HASH}")
assert_eq "GET written hash body" "$TEST_PAYLOAD" "$body"

echo ""
echo "=== Test: Idempotent PUT (same hash, same payload) ==="
code=$(curl -s -o /dev/null -w '%{http_code}' -X PUT "${TIER2_MGMT}/v/${TEST_HASH}" -d "$TEST_PAYLOAD")
assert_eq "PUT same payload -> 200" "200" "$code"

echo ""
echo "=== Test: Conflict PUT (same hash, different payload) ==="
code=$(curl -s -o /dev/null -w '%{http_code}' -X PUT "${TIER2_MGMT}/v/${TEST_HASH}" -d "DIFFERENT_PAYLOAD")
assert_eq "PUT different payload -> 409" "409" "$code"

echo ""
echo "=== Test: PUT invalid hash ==="
code=$(curl -s -o /dev/null -w '%{http_code}' -X PUT "${TIER2_MGMT}/v/badhash" -d "OK")
assert_eq "PUT invalid hash -> 400" "400" "$code"

echo ""
echo "=== Test: PUT empty payload ==="
code=$(curl -s -o /dev/null -w '%{http_code}' -X PUT "${TIER2_MGMT}/v/${TEST_HASH}" -d "")
assert_eq "PUT empty payload -> 400" "400" "$code"

echo ""
echo "=== Results: $pass passed, $fail failed ==="
[ "$fail" -eq 0 ] || exit 1
