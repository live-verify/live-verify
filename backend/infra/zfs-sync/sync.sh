#!/bin/sh
set -eu

# ZFS replication sync script.
# Sends incremental snapshots from primary to all replicas.
# Run via cron every 60 seconds.

POOL="vault_pool"
DATASET="${POOL}/hashes"
LAST_SNAP_FILE="/var/db/zfs_sync_last_snap"
LOCK_FILE="/var/run/zfs_sync.lock"
CONFIG_FILE="/usr/local/etc/zfs_replicas.conf"
SSH_KEY="/etc/zfs/deploy_key"
MAX_SNAPSHOTS=100

# Prevent concurrent runs
if [ -f "$LOCK_FILE" ]; then
    pid=$(cat "$LOCK_FILE" 2>/dev/null || echo "")
    if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
        echo "Sync already running (pid $pid), skipping."
        exit 0
    fi
    echo "Stale lock file found, removing."
    rm -f "$LOCK_FILE"
fi
echo $$ > "$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"' EXIT

# Read last successful snapshot
LAST_SNAP=$(cat "$LAST_SNAP_FILE" 2>/dev/null || echo "")

# Create new snapshot
SNAP_NAME="sync_$(date +%Y%m%d%H%M%S)"
zfs snapshot "${DATASET}@${SNAP_NAME}"
echo "Created snapshot: ${DATASET}@${SNAP_NAME}"

# Build send command
if [ -n "$LAST_SNAP" ]; then
    SEND_CMD="zfs send -i @${LAST_SNAP} ${DATASET}@${SNAP_NAME}"
else
    SEND_CMD="zfs send ${DATASET}@${SNAP_NAME}"
fi

# Read replica list from config
if [ ! -f "$CONFIG_FILE" ]; then
    echo "No replicas configured in $CONFIG_FILE"
    echo "$SNAP_NAME" > "$LAST_SNAP_FILE"
    exit 0
fi

# Send to each replica — only advance pointer if ALL succeed
all_ok=1
while IFS= read -r replica; do
    # Skip empty lines and comments
    case "$replica" in
        ""|\#*) continue ;;
    esac

    echo "Sending to $replica..."
    if $SEND_CMD | ssh -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new "$replica" "zfs recv ${DATASET}"; then
        echo "  OK: $replica"
    else
        echo "  FAILED: $replica"
        all_ok=0
    fi
done < "$CONFIG_FILE"

if [ "$all_ok" -eq 1 ]; then
    echo "$SNAP_NAME" > "$LAST_SNAP_FILE"
    echo "All replicas synced. Pointer advanced to $SNAP_NAME."
else
    echo "WARNING: Some replicas failed. Pointer NOT advanced (will retry next run)."
fi

# Prune old snapshots (keep last $MAX_SNAPSHOTS)
snap_count=$(zfs list -t snapshot -o name -H -r "$DATASET" | grep "^${DATASET}@sync_" | wc -l)
if [ "$snap_count" -gt "$MAX_SNAPSHOTS" ]; then
    prune_count=$((snap_count - MAX_SNAPSHOTS))
    echo "Pruning $prune_count old snapshots..."
    zfs list -t snapshot -o name -H -r "$DATASET" | grep "^${DATASET}@sync_" | head -n "$prune_count" | while read -r snap; do
        zfs destroy "$snap"
        echo "  Destroyed: $snap"
    done
fi

echo "Sync complete."
