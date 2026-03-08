#!/bin/sh
set -eu

# Seed authority chain hashes + claim hash into tier3 via tier2 write port.
# Runs inside the seeder container on the backend network.

TIER2_WRITE="http://tier2:8081"

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

# 1. Midsomer's meta hash → stored so policing.gov.uk can confirm authorization
MIDSOMER_META_HASH=$(meta_hash /seed/meta/midsomer.police.uk/id/verification-meta.json)
seed "$MIDSOMER_META_HASH" "OK" "Midsomer meta (authorized by policing.gov.uk)"

# 2. Policing's meta hash → stored so gov.uk can confirm authorization
POLICING_META_HASH=$(meta_hash /seed/meta/policing.gov.uk/v1/verification-meta.json)
seed "$POLICING_META_HASH" "OK" "Policing meta (authorized by gov.uk)"

# 3. Gov.uk's meta hash → stored as root (self-evident, but seeded for completeness)
GOV_META_HASH=$(meta_hash /seed/meta/gov.uk/v1/verification-meta.json)
seed "$GOV_META_HASH" "OK" "Gov.uk meta (root authority)"

echo ""
echo "=== Seeding claim hash ==="

# Gina Coulby's warrant card claim text (must match fixture HTML exactly).
# normalizeText is a no-op for plain ASCII, so hash the raw text.
CLAIM_HASH=$(printf 'MIDSOMER CONSTABULARY\nPOLICE OFFICER\nDETECTIVE GINA COULBY\nSalt: 7k3m9x2p' | sha256sum | cut -d' ' -f1)

# Generate 160x200 JPEG thumbnail of headshot (displayed at 120x150 CSS px),
# base64-encode, build JSON payload.  Needs to be large enough for visual ID.
HEADSHOT_B64=$(python3 -c "
from PIL import Image
import base64, io
img = Image.open('/seed/fixtures/gina-headshot.png')
img = img.resize((160, 200), Image.LANCZOS)
img = img.convert('RGB')
buf = io.BytesIO()
img.save(buf, format='JPEG', quality=60)
print(base64.b64encode(buf.getvalue()).decode())
")
CLAIM_PAYLOAD="{\"status\":\"OK\",\"headshot\":\"data:image/jpeg;base64,${HEADSHOT_B64}\",\"message\":\"investigating a murder\"}"
seed "$CLAIM_HASH" "$CLAIM_PAYLOAD" "Gina Coulby warrant claim"

echo ""
echo "=== Seeding complete ==="
echo "  Midsomer meta hash: ${MIDSOMER_META_HASH}"
echo "  Policing meta hash: ${POLICING_META_HASH}"
echo "  Gov.uk meta hash:   ${GOV_META_HASH}"
echo "  Claim hash:         ${CLAIM_HASH}"
