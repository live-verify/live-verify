#!/usr/bin/env bash
# backend-harness.sh
# Starts backend tiers on localhost (plain HTTP)

set -euo pipefail

TMP_DIR=$(mktemp -d /tmp/fst-badger-XXXXXX)
trap 'rm -rf "$TMP_DIR"' EXIT

echo "Starting Tier 3 (Vault) on :9090..."
(cd backend/tier3-vault && go run . --listen 127.0.0.1:9090 --db-path "$TMP_DIR") > /tmp/t3.log 2>&1 &
T3_PID=$!

echo "Starting Tier 1 (Edge) on :8081..."
(cd backend/tier1-edge && go run . --listen 127.0.0.1:8081 --upstream http://127.0.0.1:9090) > /tmp/t1.log 2>&1 &
T1_PID=$!

echo "Starting Mock Domains Server on :8002..."
node simulated-integration-tests/harness/mock-domains.js > /tmp/mock.log 2>&1 &
MOCK_PID=$!

function cleanup {
  echo "Stopping all processes..."
  kill $T3_PID $T1_PID $MOCK_PID || true
  wait $T3_PID $T1_PID $MOCK_PID || true
}

trap cleanup SIGINT SIGTERM EXIT

# Wait for healthy
echo "Waiting for services to be ready..."
for i in {1..30}; do
  if curl -s http://localhost:8081/healthz > /dev/null && \
     curl -s http://localhost:8002/healthz > /dev/null && \
     curl -s http://localhost:9090/healthz > /dev/null; then
    echo "Services ready."
    break
  fi
  sleep 1
done

# Seed hashes directly to Tier 3
echo "Seeding hashes via Tier 3 port..."
node simulated-integration-tests/harness/seed-hashes.js

echo "Backend harness ready. Press Ctrl+C to stop."
wait
