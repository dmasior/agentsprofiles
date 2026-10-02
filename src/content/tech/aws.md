---
label: "AWS"
group: "infra"
aliases: ["amazon"]
---
## rules
- Define resources in infrastructure as code. Do not create them in the console.
- Give each role and policy the least privilege it needs. Do not use `*` in actions or resources without a reason.
- Use IAM roles for workloads. Do not use long-lived access keys.
- Tag every resource with owner and environment.
- Turn on encryption at rest and block public access for S3 buckets.

## ask-first
- Create or change resources in a production account.
