---
label: "Ansible"
group: "infra"
commands:
  lint: "ansible-lint"
---
## rules
- Use modules instead of `shell` or `command` when a module exists.
- Make every task idempotent. A second run must report no changes.
- Use fully qualified collection names, for example `ansible.builtin.copy`.
- Keep secrets in Ansible Vault or an external secret store.
- Run playbooks with `--check --diff` before a real run.

## ask-first
- Run a playbook against production hosts.
