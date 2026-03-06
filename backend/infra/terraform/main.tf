terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# --- VPC ---
resource "aws_vpc" "vault" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = { Name = "fort-knox-vault" }
}

# --- Subnets ---
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.vault.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 8, 1)
  map_public_ip_on_launch = true
  availability_zone       = "${var.aws_region}a"
  tags = { Name = "vault-public" }
}

resource "aws_subnet" "dmz1" {
  vpc_id            = aws_vpc.vault.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, 2)
  availability_zone = "${var.aws_region}a"
  tags = { Name = "vault-dmz1" }
}

resource "aws_subnet" "dmz2" {
  vpc_id            = aws_vpc.vault.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, 3)
  availability_zone = "${var.aws_region}a"
  tags = { Name = "vault-dmz2" }
}

resource "aws_subnet" "mgmt" {
  vpc_id            = aws_vpc.vault.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, 4)
  availability_zone = "${var.aws_region}a"
  tags = { Name = "vault-mgmt" }
}

# --- Internet Gateway ---
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vault.id
  tags   = { Name = "vault-igw" }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.vault.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = { Name = "vault-public-rt" }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# --- NAT Gateway (for provisioning private subnets) ---
resource "aws_eip" "nat" {
  domain = "vpc"
  tags   = { Name = "vault-nat-eip" }
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public.id
  tags          = { Name = "vault-nat" }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.vault.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }
  tags = { Name = "vault-private-rt" }
}

resource "aws_route_table_association" "dmz1" {
  subnet_id      = aws_subnet.dmz1.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "dmz2" {
  subnet_id      = aws_subnet.dmz2.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "mgmt" {
  subnet_id      = aws_subnet.mgmt.id
  route_table_id = aws_route_table.private.id
}

# --- Security Groups ---
resource "aws_security_group" "tier1_public" {
  name_prefix = "vault-tier1-public-"
  vpc_id      = aws_vpc.vault.id
  description = "Tier 1: public HTTPS ingress"

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.mgmt_cidr]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "sg-tier1-public" }
}

resource "aws_security_group" "dmz1" {
  name_prefix = "vault-dmz1-"
  vpc_id      = aws_vpc.vault.id
  description = "DMZ1: Tier1 -> Tier2 read path"

  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.tier1_public.id]
  }

  tags = { Name = "sg-dmz1" }
}

resource "aws_security_group" "dmz2" {
  name_prefix = "vault-dmz2-"
  vpc_id      = aws_vpc.vault.id
  description = "DMZ2: Tier2 -> Tier3"

  ingress {
    from_port       = 9090
    to_port         = 9090
    protocol        = "tcp"
    security_groups = [aws_security_group.dmz1.id]
  }

  tags = { Name = "sg-dmz2" }
}

resource "aws_security_group" "mgmt" {
  name_prefix = "vault-mgmt-"
  vpc_id      = aws_vpc.vault.id
  description = "Management: write path from mgmt CIDR"

  ingress {
    from_port   = 8081
    to_port     = 8081
    protocol    = "tcp"
    cidr_blocks = [var.mgmt_cidr]
  }
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.mgmt_cidr]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "sg-mgmt" }
}

# --- Pod Module ---
module "pod" {
  source = "./modules/pod"

  vpc_id             = aws_vpc.vault.id
  public_subnet_id   = aws_subnet.public.id
  dmz1_subnet_id     = aws_subnet.dmz1.id
  dmz2_subnet_id     = aws_subnet.dmz2.id
  mgmt_subnet_id     = aws_subnet.mgmt.id
  sg_tier1_public_id = aws_security_group.tier1_public.id
  sg_dmz1_id         = aws_security_group.dmz1.id
  sg_dmz2_id         = aws_security_group.dmz2.id
  sg_mgmt_id         = aws_security_group.mgmt.id
  ssh_key_name       = var.ssh_key_name
  ttl_hours          = var.ttl_hours
  tier1_binary_s3    = var.tier1_binary_s3
  tier2_binary_s3    = var.tier2_binary_s3
  tier3_binary_s3    = var.tier3_binary_s3
  certs_s3_prefix    = var.certs_s3_prefix
  aws_region         = var.aws_region
}
