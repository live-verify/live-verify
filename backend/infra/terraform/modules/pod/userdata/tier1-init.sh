#!/bin/bash
set -euo pipefail

# Tier 1 Edge Gateway — Amazon Linux 2023 init

# Install AWS CLI (already on AL2023)
yum install -y awscli 2>/dev/null || true

# Download binary and certs
mkdir -p /opt/vault/certs
aws s3 cp "${binary_s3}" /opt/vault/tier1-edge --region "${region}"
chmod +x /opt/vault/tier1-edge

aws s3 cp "${certs_s3_prefix}/ca.crt"    /opt/vault/certs/ca.crt    --region "${region}"
aws s3 cp "${certs_s3_prefix}/tier1.crt"  /opt/vault/certs/tier1.crt --region "${region}"
aws s3 cp "${certs_s3_prefix}/tier1.key"  /opt/vault/certs/tier1.key --region "${region}"
chmod 600 /opt/vault/certs/*.key

# Create systemd service
cat > /etc/systemd/system/vault-tier1.service << 'UNIT'
[Unit]
Description=Fort Knox Vault - Tier 1 Edge Gateway
After=network.target

[Service]
Type=simple
ExecStart=/opt/vault/tier1-edge \
  --listen=:443 \
  --upstream=https://${tier2_ip}:8080 \
  --tls-cert=/opt/vault/certs/tier1.crt \
  --tls-key=/opt/vault/certs/tier1.key \
  --tls-ca=/opt/vault/certs/ca.crt \
  --upstream-cert=/opt/vault/certs/tier1.crt \
  --upstream-key=/opt/vault/certs/tier1.key \
  --rate-limit=60
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
UNIT

systemctl daemon-reload
systemctl enable vault-tier1
systemctl start vault-tier1
