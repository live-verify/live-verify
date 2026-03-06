# PROJECT: 100M HASH "FORT KNOX" VAULT
# ARCHITECTURE: 3-Tier Heterogeneous Global Mirror
# -----------------------------------------------------------------------------

## 1. CORE SPECIFICATIONS (NON-FUNCTIONAL)
* CAPACITY: 100 Million SHA-256 Keys + Small JSON/2-char Payloads.
* DURABILITY: 7-Year target via ZFS Parent-Child Checksumming.
* PERFORMANCE: GET < 300ms | PUT < 5s | Global Sync < 60s.
* SECURITY: Polyglot stack (Go/Rust/Go) + OS Heterogeneity (Linux/BSD/BSD).
* GROWTH: Scripted "Pod" additions (Non-elastic).

---

## 2. THE 3-TIER STACK (THE "POD")

### TIER 1: THE EDGE (INBOUND/DDOS SHIELD)
* ROLE: Public Ingestion & Rate Limiting.
* OS: Linux (e.g., Debian/Ubuntu).
* LANGUAGE: Go (High-concurrency net/http).
* NETWORKING: 
    - NIC A: Public Internet.
    - NIC B: Private DMZ-1 (VLAN 100).
* ENFORCEMENT: 
    - Rejects any payload not matching SHA-256 hex length.
    - Strips all headers except strictly required Metadata.

### TIER 2: THE INSPECTOR (PROTOCOL VALIDATOR)
* ROLE: Security Air-Lock & Logic Validation.
* OS: FreeBSD (Hardened).
* LANGUAGE: Rust (Axum/Tokio).
* NETWORKING:
    - NIC A: Private DMZ-1 (VLAN 100).
    - NIC B: Private DMZ-2 (VLAN 200).
* ENFORCEMENT: 
    - Kernel Break: Prevents Linux-specific exploit propagation.
    - Capsicum: Enters "Capability Mode" to forbid new file/socket opens post-init.

### TIER 3: THE VAULT (STORAGE & INTEGRITY)
* ROLE: Source of Truth & Bitrot Protection.
* OS: FreeBSD + ZFS.
* LANGUAGE: Go + BadgerDB (LSM-Tree engine).
* NETWORKING:
    - NIC A: Private DMZ-2 (VLAN 200).
    - NIC B: Isolated Replication LAN (Global Sync).
* STORAGE SETTINGS:
    - ZFS Properties: lz4 compression, atime=off, xattr=sa, recordsize=16k.
    - Redundancy: 3-way mirror (Triplication) or 2-way mirror + hot spare.

---

## 3. IMPLEMENTATION LOGIC (PSEUDO-CODE)

<codeBlock>
// TIER 3: IDEMPOTENT WRITE (Go + BadgerDB)
// Ensures retries do not result in duplicate IO or state corruption.
func SafePut(key []byte, val []byte) error {
    return db.Update(func(txn *badger.Txn) error {
        item, err := txn.Get(key)
        if err == nil {
            // Key exists. If payload is identical, return success (Idempotent).
            return nil 
        }
        // Commit new hash to the LSM-Tree
        return txn.Set(key, val)
    })
}
</codeBlock>

<codeBlock>
// TIER 2: CAPSICUM SANDBOXING (Rust on FreeBSD)
// Restricts the process to only the file descriptors it already owns.
#[cfg(target_os = "freebsd")]
fn lockdown() {
    capsicum::enter().expect("Failed to enter Capability Mode");
    // Process can no longer use 'open()', 'connect()', etc.
}
</codeBlock>

---

## 4. OPERATIONS & MAINTENANCE

### BITROT PREVENTION (ZFS SCRUB)
Managed via cron on Tier 3 to verify integrity against the 7-year decay:
<codeBlock>
# Run weekly at 02:00 Sunday
0 2 * * 0 /sbin/zpool scrub vault_pool
</codeBlock>

### GLOBAL SYNC (60s ASYNC REPLICATION)
Scripted push from Primary Pod to Global Replicas via Tier 3 NIC B:
<codeBlock>
#!/bin/sh
# 1. Snapshot the current state
SNAP_NAME="sync_$(date +%Y%m%d%H%M)"
zfs snapshot vault_pool/hashes@$SNAP_NAME

# 2. Incremental send to Singapore Pod
zfs send -i @previous_snap vault_pool/hashes@$SNAP_NAME | \
ssh -i /etc/zfs/deploy_key 10.0.3.5 zfs recv vault_pool/hashes
</codeBlock>

### FIREWALL ENFORCEMENT (FreeBSD PF)
Tier 2 (The Inspector) PF rules to prevent cross-tier leakage:
<codeBlock>
# /etc/pf.conf
set skip on lo
block all
pass in on em0 proto tcp from $TIER1_IP to any port 8080 # DMZ-1
pass out on em1 proto tcp from any to $TIER3_IP port 9090 # DMZ-2
</codeBlock>

---

## 5. SCALING & DEPLOYMENT
* UNITS: Scaling is done by adding "Towers" (T1+T2+T3).
* IDEMPOTENCY: Because SHA-256 is deterministic, multiple pods receiving the same
  update will result in the same final ZFS state.
* RECOVERY: If Tier 3 fails, the ZFS pool can be imported to any FreeBSD box.
</codeBlock>
