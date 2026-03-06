#!/bin/sh
set -eu

# Tier 3 Vault — FreeBSD 14.x init

# Install AWS CLI
pkg install -y awscli 2>/dev/null || true

# Download binary and certs
mkdir -p /opt/vault/certs
aws s3 cp "${binary_s3}" /opt/vault/tier3-vault --region "${region}"
chmod +x /opt/vault/tier3-vault

aws s3 cp "${certs_s3_prefix}/ca.crt"    /opt/vault/certs/ca.crt    --region "${region}"
aws s3 cp "${certs_s3_prefix}/tier3.crt"  /opt/vault/certs/tier3.crt --region "${region}"
aws s3 cp "${certs_s3_prefix}/tier3.key"  /opt/vault/certs/tier3.key --region "${region}"
chmod 600 /opt/vault/certs/*.key

# Create ZFS pool on EBS volume
zpool create \
  -o ashift=12 \
  -O compression=lz4 \
  -O atime=off \
  -O xattr=sa \
  -O recordsize=16k \
  vault_pool /dev/xvdf

zfs create vault_pool/hashes

# Create rc.d service
cat > /usr/local/etc/rc.d/vault_tier3 << 'RC'
#!/bin/sh
# PROVIDE: vault_tier3
# REQUIRE: NETWORKING ZFS
# KEYWORD: shutdown

. /etc/rc.subr

name="vault_tier3"
rcvar="vault_tier3_enable"
command="/opt/vault/tier3-vault"
command_args="--db-path=/vault_pool/hashes/badger --listen=:9090 --tls-cert=/opt/vault/certs/tier3.crt --tls-key=/opt/vault/certs/tier3.key --tls-ca=/opt/vault/certs/ca.crt &"

load_rc_config $name
: $${vault_tier3_enable:="NO"}
run_rc_command "$1"
RC

chmod +x /usr/local/etc/rc.d/vault_tier3
sysrc vault_tier3_enable="YES"
service vault_tier3 start

# Install weekly ZFS scrub cron
cat >> /etc/crontab << 'CRON'
# Weekly ZFS scrub - Sunday 02:00
0	2	*	*	0	root	/sbin/zpool scrub vault_pool
CRON
