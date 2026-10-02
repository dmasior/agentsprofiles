---
label: "Pulumi"
group: "infra"
---
## rules
- Use one stack per environment. Keep stack config in `Pulumi.<stack>.yaml`.
- Store secrets with `pulumi config set --secret`.
- Run `pulumi preview` and show the output before any update.
- Put repeated resources in component resources.

## never
- Do not run `pulumi up` or `pulumi destroy` without explicit approval.
