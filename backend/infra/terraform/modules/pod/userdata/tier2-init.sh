#!/bin/sh
set -eu

# Tier 2 Inspector — FreeBSD 14.x init

# Install AWS CLI
pkg install -y awscli 2>/dev/null || true

# Download binary and certs
mkdir -p /opt/vault/certs
aws s3 cp "${binary_s3}" /opt/vault/tier2-inspector --region "${region}"
chmod +x /opt/vault/tier2-inspector

aws s3 cp "${certs_s3_prefix}/ca.crt"    /opt/vault/certs/ca.crt    --region "${region}"
aws s3 cp "${certs_s3_prefix}/tier2.crt"  /opt/vault/certs/tier2.crt --region "${region}"
aws s3 cp "${certs_s3_prefix}/tier2.key"  /opt/vault/certs/tier2.key --region "${region}"
chmod 600 /opt/vault/certs/*.key

# Configure PF firewall
cat > /etc/pf.conf << 'PF'
set skip on lo
block all
# DMZ-1: reads from Tier 1
pass in on vtnet0 proto tcp from any to any port 8080
# Management VLAN: writes from issuers
pass in on vtnet0 proto tcp from any to any port 8081
# DMZ-2: outbound to Tier 3
pass out on vtnet0 proto tcp from any to any port 9090
# Allow established connections
pass out on vtnet0 proto tcp from any to any flags A/A
PF

sysrc pf_enable="YES"
service pf start 2>/dev/null || pfctl -f /etc/pf.conf

# Create rc.d service
cat > /usr/local/etc/rc.d/vault_tier2 << 'RC'
#!/bin/sh
# PROVIDE: vault_tier2
# REQUIRE: NETWORKING
# KEYWORD: shutdown

. /etc/rc.subr

name="vault_tier2"
rcvar="vault_tier2_enable"
command="/opt/vault/tier2-inspector"
command_args="--read-port=8080 --write-port=8081 --upstream=https://${tier3_ip}:9090 --tls-cert=/opt/vault/certs/tier2.crt --tls-key=/opt/vault/certs/tier2.key --tls-ca=/opt/vault/certs/ca.crt --upstream-cert=/opt/vault/certs/tier2.crt --upstream-key=/opt/vault/certs/tier2.key &"

load_rc_config $name
: $${vault_tier2_enable:="NO"}
run_rc_command "$1"
RC

chmod +x /usr/local/etc/rc.d/vault_tier2
sysrc vault_tier2_enable="YES"
service vault_tier2 start
