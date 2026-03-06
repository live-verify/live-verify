output "tier1_public_ip" {
  description = "Public IP of Tier 1 edge gateway"
  value       = module.pod.tier1_public_ip
}

output "tier2_private_ip" {
  description = "Private IP of Tier 2 inspector (DMZ1)"
  value       = module.pod.tier2_private_ip
}

output "tier3_private_ip" {
  description = "Private IP of Tier 3 vault (DMZ2)"
  value       = module.pod.tier3_private_ip
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.vault.id
}
