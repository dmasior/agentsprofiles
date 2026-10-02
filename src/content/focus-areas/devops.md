---
label: "Infrastructure and deployment"
order: 4
scope: "When changing infrastructure, CI pipelines or deployment configuration:"
---
## rules
- Keep all infrastructure in code. Do not make manual changes in cloud consoles.
- Make changes idempotent and safe to apply twice.
- Show the plan or diff of an infrastructure change before you apply it.
- Pin versions of images, providers and CI actions.
- Keep secrets in the secret manager. Reference them, do not copy them.

## ask-first
- Apply changes to production or shared environments.

## never
- Do not widen network access or IAM permissions beyond what the task needs.
