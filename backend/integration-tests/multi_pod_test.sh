#!/usr/bin/env bash
set -euo pipefail

# Multi-pod integration tests: replication, conflict detection, network isolation.
# Requires: docker compose -f docker-compose.multi-pod.yml up --build -d

POD_A_READ="${POD_A_READ:-http://localhost:8080}"
POD_B_READ="${POD_B_READ:-http://localhost:8180}"
POD_A_WRITE="${POD_A_WRITE:-http://localhost:8081}"
POD_B_WRITE="${POD_B_WRITE:-http://localhost:8181}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

pass=0
fail=0

assert_eq() {
    local desc="$1" expected="$2" actual="$3"
    if [ "$expected" = "$actual" ]; then
        echo -e "  ${GREEN}PASS${NC}: $desc"
        ((pass++))
    else
        echo -e "  ${RED}FAIL${NC}: $desc (expected '$expected', got '$actual')"
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

# ── Wait for both pods ──────────────────────────────────────────────────

echo "=== Waiting for Pod A ==="
for i in $(seq 1 30); do
    if curl -s "${POD_A_READ}/healthz" > /dev/null 2>&1; then
        echo "Pod A ready."
        break
    fi
    if [ "$i" -eq 30 ]; then echo "Timeout waiting for Pod A"; exit 1; fi
    sleep 1
done

echo "=== Waiting for Pod B ==="
for i in $(seq 1 30); do
    if curl -s "${POD_B_READ}/healthz" > /dev/null 2>&1; then
        echo "Pod B ready."
        break
    fi
    if [ "$i" -eq 30 ]; then echo "Timeout waiting for Pod B"; exit 1; fi
    sleep 1
done

# ── A. Replication & Convergence ────────────────────────────────────────

echo ""
echo "=== A. Replication & Convergence ==="

# A1: Write to Pod A only — Pod A has it, Pod B does not.
HASH_A1="a100000000000000000000000000000000000000000000000000000000000001"
curl -s -o /dev/null -X PUT "${POD_A_WRITE}/v/${HASH_A1}" -d '{"status":"verified"}'
assert_status "A1: GET from Pod A after write to A -> 200" "200" \
    "${POD_A_READ}/c/${HASH_A1}"
assert_status "A1: GET from Pod B (not replicated) -> 404" "404" \
    "${POD_B_READ}/c/${HASH_A1}"

# A2: Simulate replication — write same hash+payload to Pod B.
curl -s -o /dev/null -X PUT "${POD_B_WRITE}/v/${HASH_A1}" -d '{"status":"verified"}'
assert_status "A2: GET from Pod B after simulated replication -> 200" "200" \
    "${POD_B_READ}/c/${HASH_A1}"
body_a=$(curl -s "${POD_A_READ}/c/${HASH_A1}")
body_b=$(curl -s "${POD_B_READ}/c/${HASH_A1}")
assert_eq "A2: Both pods return same payload" "$body_a" "$body_b"

# A3: Write same hash to both pods simultaneously — idempotent convergence.
HASH_A3="a300000000000000000000000000000000000000000000000000000000000003"
curl -s -o /dev/null -X PUT "${POD_A_WRITE}/v/${HASH_A3}" -d '{"status":"verified"}' &
curl -s -o /dev/null -X PUT "${POD_B_WRITE}/v/${HASH_A3}" -d '{"status":"verified"}' &
wait
assert_status "A3: Pod A returns 200 after simultaneous write" "200" \
    "${POD_A_READ}/c/${HASH_A3}"
assert_status "A3: Pod B returns 200 after simultaneous write" "200" \
    "${POD_B_READ}/c/${HASH_A3}"

# ── B. Conflict Detection ──────────────────────────────────────────────

echo ""
echo "=== B. Conflict Detection ==="

# B4: Write different payloads for the same hash to each pod.
HASH_B4="b400000000000000000000000000000000000000000000000000000000000004"
curl -s -o /dev/null -X PUT "${POD_A_WRITE}/v/${HASH_B4}" -d '{"status":"verified"}'
curl -s -o /dev/null -X PUT "${POD_B_WRITE}/v/${HASH_B4}" -d '{"status":"revoked"}'

body_a=$(curl -s "${POD_A_READ}/c/${HASH_B4}")
body_b=$(curl -s "${POD_B_READ}/c/${HASH_B4}")
assert_eq "B4: Pod A returns its own value" '{"status":"verified"}' "$body_a"
assert_eq "B4: Pod B returns its own value" '{"status":"revoked"}' "$body_b"

# Cross-replicating the conflicting value should return 409.
assert_status "B4: Replicating Pod B's value to Pod A -> 409 Conflict" "409" \
    "${POD_A_WRITE}/v/${HASH_B4}" -X PUT -d '{"status":"revoked"}'
assert_status "B4: Replicating Pod A's value to Pod B -> 409 Conflict" "409" \
    "${POD_B_WRITE}/v/${HASH_B4}" -X PUT -d '{"status":"verified"}'

# ── D. Network Isolation ───────────────────────────────────────────────

echo ""
echo "=== D. Network Isolation ==="

# D7: Tier 1 is read-only — POST/PUT must be rejected.
HASH_D7="d700000000000000000000000000000000000000000000000000000000000007"
assert_status "D7: POST to tier1-a -> 405" "405" \
    "${POD_A_READ}/c/${HASH_D7}" -X POST
assert_status "D7: PUT to tier1-a -> 405" "405" \
    "${POD_A_READ}/c/${HASH_D7}" -X PUT -d '{"status":"verified"}'
assert_status "D7: POST to tier1-b -> 405" "405" \
    "${POD_B_READ}/c/${HASH_D7}" -X POST
assert_status "D7: PUT to tier1-b -> 405" "405" \
    "${POD_B_READ}/c/${HASH_D7}" -X PUT -d '{"status":"verified"}'

# ── Results ─────────────────────────────────────────────────────────────

echo ""
echo "=== Results: $pass passed, $fail failed ==="
[ "$fail" -eq 0 ] || exit 1
