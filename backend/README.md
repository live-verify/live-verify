# Fort Knox 3-Tier Hash Vault

The backend for Live Verify: a hardened, heterogeneous 3-tier architecture that stores
and serves SHA-256 verification hashes at scale.

## Why this architecture?

Live Verify lets anyone point a phone camera at a printed claim and verify it instantly.
The client computes `SHA-256(text)` and looks up the hash against an issuer's endpoint.
That endpoint needs to be:

- **Fast** — public GETs under 300ms globally
- **Durable** — 7-year retention with bitrot protection
- **Tamper-resistant** — a compromised edge node cannot alter stored hashes
- **Write-isolated** — the public internet has read-only access; writes enter through a
  separate network that is never exposed

A single-tier server could handle the throughput, but it would be a single point of
compromise. The 3-tier design means an attacker must chain exploits across two different
operating systems (Linux + FreeBSD), two different languages (Go + Rust + Go), and three
separate network segments — all connected only by mTLS.

## Architecture

```
                    PUBLIC INTERNET
                         |
                    +---------+
                    | TIER 1  |  Linux / Go
                    |  Edge   |  GET-only gateway, rate limiting
                    +---------+
                         | mTLS (DMZ-1, VLAN 100)
                    +---------+
   Issuers -------->| TIER 2  |  FreeBSD / Rust (Axum)
   (mTLS, mgmt     |Inspector|  Protocol validation, Capsicum sandbox
    VLAN)           +---------+
                         | mTLS (DMZ-2, VLAN 200)
                    +---------+
                    | TIER 3  |  FreeBSD / Go + BadgerDB
                    |  Vault  |  ZFS, idempotent writes, replication
                    +---------+
```

### Tier 1 — The Edge (Linux/Go)

Public-facing read gateway. Rejects anything that isn't a GET. Extracts the last path
segment as the hash (path-agnostic — `/c/`, `/claims/`, `/v/` all work). Per-IP token
bucket rate limiting. Strips headers and forwards to Tier 2 over mTLS.

### Tier 2 — The Inspector (FreeBSD/Rust)

Security air-lock. Runs on FreeBSD to break Linux kernel exploit chains. Two ports:

- **Port 8080** (read): receives validated GETs from Tier 1, forwards to Tier 3
- **Port 8081** (write): receives PUTs from issuer backends over the management VLAN,
  validates payload (max 8KB, valid UTF-8), forwards to Tier 3

After binding sockets, loading TLS, and warming the Tier 3 connection pool, the process
enters FreeBSD Capsicum capability mode — no new files or sockets can be opened.
This is feature-gated (`--features capsicum`) so the same code builds on Linux for dev.

### Tier 3 — The Vault (FreeBSD/Go + BadgerDB)

Source of truth. Keys are stored as 32-byte binary (hex-decoded from SHA-256) to halve
key storage. Writes are idempotent: same key + same value = success; same key +
different value = 409 Conflict. This means retries and multi-pod replication converge
to identical state.

ZFS provides bitrot detection via weekly scrubs, lz4 compression, and snapshot-based
replication to other pods.

## Core specifications

| Property | Target |
|---|---|
| Capacity | 100 million SHA-256 keys + small payloads |
| Durability | 7-year via ZFS checksumming |
| Read latency | < 300ms (public GET, p99) |
| Write latency | < 5s (internal) |
| Global sync | < 60s (async ZFS replication) |
| Growth model | Add pods (T1+T2+T3), non-elastic |

## Data paths

**Read (public):** End-user -> Tier 1 (GET only) -> Tier 2 (validate) -> Tier 3
(BadgerDB lookup) -> response bubbles back. All inter-tier traffic is mTLS.

**Write (internal):** Issuer backend -> Tier 2 management port (8081, mTLS client cert)
-> Tier 3. The public internet never touches the write path. Tier 1 has no write
capability.

## API contract

The client (web app, browser extension, Android, iOS) constructs
`GET https://{domain}/{path}/{sha256}` and interprets:

| Response | Meaning |
|---|---|
| 200 + JSON `{"status":"verified"}` | Verified |
| 200 + other body | Status JSON (e.g. `{"status":"revoked"}`, `{"status":"graduated"}`) |
| 404 | Not found |
| 429 | Rate limited |

The client also fetches `{basePath}/verification-meta.json` for issuer metadata
(claim types, response type definitions, authorization chain).

## Directory structure

```
backend/
  docker-compose.yml              # Single-pod (3 containers)
  docker-compose.multi-pod.yml    # Two pods (6 containers) for integration tests
  tier1-edge/                     # Go — public read gateway
  tier2-inspector/                # Rust/Axum — security air-lock
  tier3-vault/                    # Go + BadgerDB — storage
    internal/store/               # VaultStore (shared by server + seed tool)
    seed/                         # Import tool for public/c/ static files
  certs/                          # Dev certificate generator
  integration-tests/              # End-to-end test scripts
  infra/
    terraform/                    # Single-pod AWS deployment
    zfs-sync/                     # Cross-pod replication script
```

## Quick start (Docker)

```sh
# Generate dev certificates (includes multi-pod SANs)
cd backend/certs && bash generate-dev-certs.sh && cd ..

# Start all 3 tiers (single pod)
docker compose up --build -d

# Seed demo hashes and verify
cd integration-tests && bash seed_and_verify.sh
```

### Multi-pod testing

```sh
# Start 2 complete pods (6 containers)
cd backend && docker compose -f docker-compose.multi-pod.yml up --build -d

# Run multi-pod tests (replication, conflicts, network isolation)
cd integration-tests && bash multi_pod_test.sh

# Run failover tests (stops/starts containers — destructive)
bash multi_pod_failover_test.sh

# Tear down
cd .. && docker compose -f docker-compose.multi-pod.yml down -v
```

Pod A exposes `8080` (read) and `8081` (write). Pod B exposes `8180` (read) and
`8181` (write). Each pod has its own isolated DMZ networks and BadgerDB volume.

## Testing

### Unit tests

```sh
cd backend/tier1-edge && go test ./...
cd backend/tier3-vault && go test ./...
cd backend/tier2-inspector && cargo check
```

**Tier 1** (7 tests): method filtering, hash validation, upstream forwarding, path-agnostic routing, rate limiting, healthz.

**Tier 3** (11 tests): store get/put/idempotent/conflict/invalid-hash (5), HTTP handlers for healthz, GET, PUT+GET round-trip, conflict 409, bad hash, empty payload (6).

**Tier 2**: cargo check only — thin proxy validated by integration tests.

### Integration tests — single pod

Require `docker compose up --build -d`.

```sh
cd backend/integration-tests
bash seed_and_verify.sh      # Seed 8 demo hashes, full read chain, 404/400/405, path-agnostic
bash write_path_test.sh      # PUT/GET round-trip, idempotent PUT, conflict 409
bash latency_bench.sh        # 10k hashes, 1k GETs, assert p99 < 300ms
```

### Integration tests — multi-pod

Require `docker compose -f docker-compose.multi-pod.yml up --build -d`.

```sh
cd backend/integration-tests
bash multi_pod_test.sh           # Replication convergence, conflict 409, read-only enforcement
bash multi_pod_failover_test.sh  # Tier 3 down → 502 + recovery, Tier 1 down → Pod B unaffected
```

## Scaling and replication

All pods hold a full copy of all data (whole replication, not sharded). End-user traffic
is directed to the nearest pod via GeoDNS. New pods receive a full ZFS send on first
sync, then incremental snapshots thereafter.

Because SHA-256 is deterministic, multiple pods receiving the same write converge to
identical ZFS state. If a Tier 3 node fails, its ZFS pool can be imported to any FreeBSD
box. Other pods continue serving reads while the failed pod is rebuilt.

Replication is managed by `infra/zfs-sync/sync.sh`:
- Incremental `zfs send` to each replica over SSH
- Only advances the snapshot pointer if all replicas succeed
- Keeps the last 100 snapshots, prunes older ones

## Operations

**ZFS scrub** — weekly cron on Tier 3 (Sunday 02:00) to detect bitrot:
```
0 2 * * 0 /sbin/zpool scrub vault_pool
```

**Firewall** — FreeBSD PF on Tier 2 restricts traffic to only the expected ports and
source networks. AWS security groups enforce the same at the cloud layer.

**Auto-termination** — test instances are tagged with a TTL and auto-terminated after
expiry (default 4 hours) to prevent cost overruns.

## AWS deployment

```sh
cd backend/infra/terraform
terraform init
terraform plan -var="ssh_key_name=my-key" -var="tier1_binary_s3=s3://..." ...
terraform apply
```

The Terraform creates a VPC with four subnets (public, dmz1, dmz2, mgmt), security
groups enforcing read/write path separation, and one pod (3 EC2 instances). Tier 1 runs
Amazon Linux 2023; Tiers 2 and 3 run FreeBSD 14.x from the FreeBSD Foundation AMIs.

## Key design decisions

1. **Binary keys** — SHA-256 hashes stored as 32 bytes (not 64-char hex strings),
   halving key storage in BadgerDB.

2. **Path-agnostic edge** — Tier 1 extracts the last path segment as the hash.
   Different issuers can use `/c/`, `/claims/`, `/verify/` — the backend doesn't care.

3. **Capsicum after warmup** — Tier 2 pre-warms the connection pool to Tier 3 before
   entering capability mode. Capsicum forbids `socket()` but allows IO on existing FDs.

4. **Idempotent writes** — `SafePut` makes retries and multi-writer convergence safe.
   Same key + same payload = no-op success. Same key + different payload = 409.

5. **OS heterogeneity** — Linux (Tier 1) + FreeBSD (Tiers 2, 3) means a Linux kernel
   exploit cannot propagate past the edge.

6. **Language heterogeneity** — Go (Tier 1) + Rust (Tier 2) + Go (Tier 3) means a
   language-level vulnerability (e.g. Go runtime bug) cannot be used to pivot from
   Tier 1 to Tier 2.
