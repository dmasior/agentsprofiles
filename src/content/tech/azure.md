---
label: "Azure"
group: "infra"
---
## rules
- Define resources in Bicep or Terraform. Do not create them in the portal.
- Use managed identities for workloads. Do not store connection strings with keys in code.
- Keep secrets in Azure Key Vault.
- Assign RBAC roles at the smallest scope that works.
- Tag every resource with owner and environment.

## ask-first
- Create or change resources in a production subscription.
