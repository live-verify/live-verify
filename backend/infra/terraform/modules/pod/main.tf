variable "vpc_id" { type = string }
variable "public_subnet_id" { type = string }
variable "dmz1_subnet_id" { type = string }
variable "dmz2_subnet_id" { type = string }
variable "mgmt_subnet_id" { type = string }
variable "sg_tier1_public_id" { type = string }
variable "sg_dmz1_id" { type = string }
variable "sg_dmz2_id" { type = string }
variable "sg_mgmt_id" { type = string }
variable "ssh_key_name" { type = string }
variable "ttl_hours" { type = number }
variable "tier1_binary_s3" { type = string }
variable "tier2_binary_s3" { type = string }
variable "tier3_binary_s3" { type = string }
variable "certs_s3_prefix" { type = string }
variable "aws_region" { type = string }

# --- IAM role for S3 access ---
resource "aws_iam_role" "vault_instance" {
  name_prefix = "vault-instance-"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy" "s3_read" {
  name_prefix = "vault-s3-read-"
  role        = aws_iam_role.vault_instance.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["s3:GetObject"]
      Resource = ["arn:aws:s3:::*"]
    }]
  })
}

resource "aws_iam_instance_profile" "vault" {
  name_prefix = "vault-"
  role        = aws_iam_role.vault_instance.name
}

# --- FreeBSD 14.x AMI ---
data "aws_ami" "freebsd14" {
  most_recent = true
  owners      = ["782442783595"] # FreeBSD Foundation

  filter {
    name   = "name"
    values = ["FreeBSD 14.*-RELEASE-amd64*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# --- Amazon Linux 2023 AMI ---
data "aws_ami" "al2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# --- Tier 1: Linux Edge ---
resource "aws_instance" "tier1" {
  ami                    = data.aws_ami.al2023.id
  instance_type          = "t3.medium"
  key_name               = var.ssh_key_name
  subnet_id              = var.public_subnet_id
  vpc_security_group_ids = [var.sg_tier1_public_id, var.sg_dmz1_id]
  iam_instance_profile   = aws_iam_instance_profile.vault.name

  user_data = templatefile("${path.module}/userdata/tier1-init.sh", {
    binary_s3       = var.tier1_binary_s3
    certs_s3_prefix = var.certs_s3_prefix
    tier2_ip        = aws_instance.tier2.private_ip
    region          = var.aws_region
  })

  tags = {
    Name    = "vault-tier1-edge"
    TTL     = var.ttl_hours
    Expires = timeadd(timestamp(), "${var.ttl_hours}h")
  }

  lifecycle {
    ignore_changes = [tags["Expires"]]
  }
}

# --- Tier 2: FreeBSD Inspector ---
resource "aws_instance" "tier2" {
  ami                    = data.aws_ami.freebsd14.id
  instance_type          = "t3.medium"
  key_name               = var.ssh_key_name
  subnet_id              = var.dmz1_subnet_id
  vpc_security_group_ids = [var.sg_dmz1_id, var.sg_dmz2_id, var.sg_mgmt_id]
  iam_instance_profile   = aws_iam_instance_profile.vault.name

  user_data = templatefile("${path.module}/userdata/tier2-init.sh", {
    binary_s3       = var.tier2_binary_s3
    certs_s3_prefix = var.certs_s3_prefix
    tier3_ip        = aws_instance.tier3.private_ip
    region          = var.aws_region
  })

  tags = {
    Name    = "vault-tier2-inspector"
    TTL     = var.ttl_hours
    Expires = timeadd(timestamp(), "${var.ttl_hours}h")
  }

  lifecycle {
    ignore_changes = [tags["Expires"]]
  }
}

# --- Tier 3: FreeBSD Vault ---
resource "aws_instance" "tier3" {
  ami                    = data.aws_ami.freebsd14.id
  instance_type          = "t3.medium"
  key_name               = var.ssh_key_name
  subnet_id              = var.dmz2_subnet_id
  vpc_security_group_ids = [var.sg_dmz2_id]
  iam_instance_profile   = aws_iam_instance_profile.vault.name

  user_data = templatefile("${path.module}/userdata/tier3-init.sh", {
    binary_s3       = var.tier3_binary_s3
    certs_s3_prefix = var.certs_s3_prefix
    region          = var.aws_region
  })

  # EBS volume for ZFS
  ebs_block_device {
    device_name = "/dev/xvdf"
    volume_type = "gp3"
    volume_size = 50
    iops        = 3000
    throughput  = 125
  }

  tags = {
    Name    = "vault-tier3-vault"
    TTL     = var.ttl_hours
    Expires = timeadd(timestamp(), "${var.ttl_hours}h")
  }

  lifecycle {
    ignore_changes = [tags["Expires"]]
  }
}

# --- Outputs ---
output "tier1_public_ip" {
  value = aws_instance.tier1.public_ip
}

output "tier2_private_ip" {
  value = aws_instance.tier2.private_ip
}

output "tier3_private_ip" {
  value = aws_instance.tier3.private_ip
}
