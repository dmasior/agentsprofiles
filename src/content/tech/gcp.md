---
label: "Google Cloud"
group: "infra"
---
## rules
- Define resources in infrastructure as code. Do not create them in the console.
- Use service accounts with the least privilege. Do not grant basic roles such as `roles/editor`.
- Use Workload Identity instead of service account key files.
- Keep secrets in Secret Manager.
- Label every resource with owner and environment.

## ask-first
- Create or change resources in a production project.
