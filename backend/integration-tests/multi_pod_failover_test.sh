#!/usr/bin/env bash
set -euo pipefail

# Multi-pod failover tests: stop/start individual containers, verify degradation
# and recovery. Destructive — uses docker compose stop/start.
#
# Requires: docker compose -f docker-compose.multi-pod.yml up --build -d

COMPOSE_FILE="${COMPOSE_FILE:-../docker-compose.multi-pod.yml}"
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

wait_for_url() {
    local url="$1" max="${2:-30}"
    for i in $(seq 1 "$max"); do
        if curl -s "$url" > /dev/null 2>&1; then return 0; fi
        sleep 1
    done
    return 1
}

dc() {
    docker compose -f "$COMPOSE_FILE" "$@"
}

# ── Seed a hash to both pods so we can test reads after failover ────────

echo "=== Seeding test data ==="
wait_for_url "${POD_A_READ}/healthz"
wait_for_url "${POD_B_READ}/healthz"

HASH_F="f500000000000000000000000000000000000000000000000000000000000005"
curl -s -o /dev/null -X PUT "${POD_A_WRITE}/v/${HASH_F}" -d "OK"
curl -s -o /dev/null -X PUT "${POD_B_WRITE}/v/${HASH_F}" -d "OK"
echo "Seeded $HASH_F to both pods."

# ── C5: Stop tier3-a — tier1-a degrades, tier1-b unaffected ────────────

echo ""
echo "=== C5: Tier 3 failure ==="

echo -e "  ${YELLOW}Stopping tier3-a...${NC}"
dc stop tier3-a
sleep 2

assert_status "C5: tier1-a degrades (502) with tier3-a down" "502" \
    "${POD_A_READ}/c/${HASH_F}"
assert_status "C5: tier1-b still serves (200) while tier3-a down" "200" \
    "${POD_B_READ}/c/${HASH_F}"

echo -e "  ${YELLOW}Starting tier3-a...${NC}"
dc start tier3-a
wait_for_url "${POD_A_READ}/healthz"

assert_status "C5: tier1-a recovers (200) after tier3-a restart" "200" \
    "${POD_A_READ}/c/${HASH_F}"

# ── C6: Stop tier1-a — Pod B unaffected ────────────────────────────────

echo ""
echo "=== C6: Tier 1 failure ==="

echo -e "  ${YELLOW}Stopping tier1-a...${NC}"
dc stop tier1-a
sleep 2

assert_status "C6: tier1-b still serves (200) while tier1-a down" "200" \
    "${POD_B_READ}/c/${HASH_F}"

echo -e "  ${YELLOW}Starting tier1-a...${NC}"
dc start tier1-a
wait_for_url "${POD_A_READ}/healthz"

assert_status "C6: tier1-a recovers (200) after restart" "200" \
    "${POD_A_READ}/c/${HASH_F}"

# ── Results ─────────────────────────────────────────────────────────────

echo ""
echo "=== Results: $pass passed, $fail failed ==="
[ "$fail" -eq 0 ] || exit 1
