---
label: "GitLab CI"
group: "infra"
aliases: ["ci"]
---
## rules
- Use `rules` instead of `only` and `except`.
- Reuse config with `include` and `extends`. Do not copy job definitions.
- Pin job images to a specific version tag.
- Use protected and masked CI/CD variables for secrets.
- Cache dependencies with a `cache` key based on the lock file.
