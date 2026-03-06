#!/usr/bin/env bash
set -euo pipefail

# Generate development TLS certificates for the 3-tier vault.
# Creates a single CA + per-tier server/client certs with EC P-256 keys.
# SANs include localhost and Docker hostnames.

CERT_DIR="$(cd "$(dirname "$0")" && pwd)/dev"
mkdir -p "$CERT_DIR"
cd "$CERT_DIR"

DAYS=365

echo "==> Generating dev CA"
openssl ecparam -genkey -name prime256v1 -noout -out ca.key
openssl req -new -x509 -key ca.key -out ca.crt -days "$DAYS" \
  -subj "/CN=FortKnox Dev CA" -sha256

generate_cert() {
  local name="$1"
  shift
  local sans="$*"

  echo "==> Generating cert for $name (SANs: $sans)"

  openssl ecparam -genkey -name prime256v1 -noout -out "${name}.key"

  # Build SAN extension
  local san_ext="subjectAltName="
  local first=1
  for san in $sans; do
    if [ "$first" -eq 1 ]; then
      first=0
    else
      san_ext="${san_ext},"
    fi
    # Check if it's an IP or DNS name
    if echo "$san" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$'; then
      san_ext="${san_ext}IP:${san}"
    else
      san_ext="${san_ext}DNS:${san}"
    fi
  done

  openssl req -new -key "${name}.key" -out "${name}.csr" \
    -subj "/CN=${name}" -sha256

  openssl x509 -req -in "${name}.csr" -CA ca.crt -CAkey ca.key \
    -CAcreateserial -out "${name}.crt" -days "$DAYS" -sha256 \
    -extfile <(echo "$san_ext")

  rm -f "${name}.csr"
}

# Tier 1 - Edge (Linux/Go)
generate_cert tier1 localhost tier1 tier1-a tier1-b 127.0.0.1

# Tier 2 - Inspector (Rust/Axum)
generate_cert tier2 localhost tier2 tier2-a tier2-b 127.0.0.1

# Tier 3 - Vault (Go + BadgerDB)
generate_cert tier3 localhost tier3 tier3-a tier3-b 127.0.0.1

# Demo issuer client cert (for write path testing)
generate_cert demo-issuer localhost demo-issuer 127.0.0.1

echo ""
echo "Dev certificates generated in: $CERT_DIR"
echo "  CA:           ca.crt / ca.key"
echo "  Tier 1:       tier1.crt / tier1.key"
echo "  Tier 2:       tier2.crt / tier2.key"
echo "  Tier 3:       tier3.crt / tier3.key"
echo "  Demo Issuer:  demo-issuer.crt / demo-issuer.key"
