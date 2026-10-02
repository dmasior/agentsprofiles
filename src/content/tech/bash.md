---
label: "Bash / Shell"
group: "languages"
aliases: ["shell", "sh", "zsh"]
commands:
  lint: "shellcheck $(git ls-files '*.sh')"
---
## rules
- Start each Bash script with `#!/usr/bin/env bash` and `set -euo pipefail`.
- Quote every variable expansion, for example `"$file"`.
- Use `[[ ... ]]` for tests and `$(...)` for command substitution.
- Declare variables inside functions with `local`.
- Fix all `shellcheck` warnings. Do not disable a check without a comment that says why.

## never
- Do not run `rm -rf` on a path built from a variable that can be empty.
