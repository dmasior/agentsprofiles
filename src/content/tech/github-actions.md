---
label: "GitHub Actions"
group: "infra"
aliases: ["gha", "ci"]
---
## rules
- Pin third-party actions to a full commit SHA.
- Set `permissions` for each workflow to the minimum it needs.
- Use `concurrency` groups to cancel outdated runs.
- Cache dependencies with the cache option of the setup action or `actions/cache`.
- Store secrets in repository or environment secrets. Do not print them in logs.

## never
- Do not run untrusted pull request code with `pull_request_target` and secrets.
