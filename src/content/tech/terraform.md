---
label: "Terraform"
group: "infra"
aliases: ["tf", "opentofu"]
commands:
  install: "terraform init"
  lint: "terraform validate"
  format: "terraform fmt -recursive"
---
## rules
- Pin provider and module versions in `required_providers` and module sources.
- Use remote state with locking. Do not commit state files.
- Use variables and modules for repeated resources. Do not copy resource blocks.
- Run `terraform plan` and show the output before any apply.

## never
- Do not run `terraform apply` or `terraform destroy` without explicit approval.
