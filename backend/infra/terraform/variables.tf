variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-1"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "mgmt_cidr" {
  description = "CIDR allowed to access management port (write path)"
  type        = string
  default     = "10.0.4.0/24"
}

variable "ttl_hours" {
  description = "Auto-terminate instances after this many hours"
  type        = number
  default     = 4
}

variable "ssh_key_name" {
  description = "EC2 key pair name for SSH access"
  type        = string
}

variable "tier1_binary_s3" {
  description = "S3 path for pre-built Tier 1 binary"
  type        = string
}

variable "tier2_binary_s3" {
  description = "S3 path for pre-built Tier 2 binary (FreeBSD amd64)"
  type        = string
}

variable "tier3_binary_s3" {
  description = "S3 path for pre-built Tier 3 binary (FreeBSD amd64)"
  type        = string
}

variable "certs_s3_prefix" {
  description = "S3 prefix for TLS certificates"
  type        = string
}
