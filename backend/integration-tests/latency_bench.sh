#!/usr/bin/env bash
set -euo pipefail

# Latency benchmark: seed 10k hashes, measure p50/p95/p99 for random GETs.
# Requires docker compose up to be running.

BASE_URL="${BASE_URL:-http://localhost:8080}"
TIER2_MGMT="${TIER2_MGMT:-http://localhost:8081}"
SEED_COUNT="${SEED_COUNT:-10000}"
GET_COUNT="${GET_COUNT:-1000}"
P99_MAX_MS="${P99_MAX_MS:-300}"

echo "=== Waiting for services ==="
for i in $(seq 1 30); do
    if curl -s "${BASE_URL}/healthz" > /dev/null 2>&1; then
        echo "Services ready."
        break
    fi
    if [ "$i" -eq 30 ]; then echo "Timeout"; exit 1; fi
    sleep 1
done

echo ""
echo "=== Seeding $SEED_COUNT random hashes ==="
HASHES_FILE=$(mktemp)
trap 'rm -f "$HASHES_FILE" "$TIMES_FILE"' EXIT

for i in $(seq 1 "$SEED_COUNT"); do
    hash=$(printf '%064x' "$i")
    echo "$hash" >> "$HASHES_FILE"
    curl -s -o /dev/null -X PUT "${TIER2_MGMT}/v/${hash}" -d "BENCH_OK"
    if (( i % 1000 == 0 )); then
        echo "  Seeded $i/$SEED_COUNT"
    fi
done
echo "  Seeding complete."

echo ""
echo "=== Running $GET_COUNT random GETs ==="
TIMES_FILE=$(mktemp)
TOTAL_LINES=$(wc -l < "$HASHES_FILE")

for i in $(seq 1 "$GET_COUNT"); do
    line=$(( (RANDOM * 32768 + RANDOM) % TOTAL_LINES + 1 ))
    hash=$(sed -n "${line}p" "$HASHES_FILE")
    # Measure time in milliseconds
    time_ms=$(curl -s -o /dev/null -w '%{time_total}' "${BASE_URL}/c/${hash}")
    # Convert seconds to ms (integer)
    ms=$(echo "$time_ms * 1000" | bc | cut -d. -f1)
    echo "$ms" >> "$TIMES_FILE"
    if (( i % 200 == 0 )); then
        echo "  Completed $i/$GET_COUNT GETs"
    fi
done

echo ""
echo "=== Results ==="
sort -n "$TIMES_FILE" > "${TIMES_FILE}.sorted"
mv "${TIMES_FILE}.sorted" "$TIMES_FILE"

total=$GET_COUNT
p50_idx=$(( total * 50 / 100 ))
p95_idx=$(( total * 95 / 100 ))
p99_idx=$(( total * 99 / 100 ))

p50=$(sed -n "${p50_idx}p" "$TIMES_FILE")
p95=$(sed -n "${p95_idx}p" "$TIMES_FILE")
p99=$(sed -n "${p99_idx}p" "$TIMES_FILE")
min=$(head -1 "$TIMES_FILE")
max=$(tail -1 "$TIMES_FILE")

echo "  Requests: $total"
echo "  Min:  ${min}ms"
echo "  p50:  ${p50}ms"
echo "  p95:  ${p95}ms"
echo "  p99:  ${p99}ms"
echo "  Max:  ${max}ms"

if [ "$p99" -le "$P99_MAX_MS" ]; then
    echo ""
    echo "PASS: p99 ${p99}ms <= ${P99_MAX_MS}ms threshold"
else
    echo ""
    echo "FAIL: p99 ${p99}ms > ${P99_MAX_MS}ms threshold"
    exit 1
fi
