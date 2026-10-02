---
label: "Deno"
group: "backend"
commands:
  test: "deno test"
  lint: "deno lint"
  format: "deno fmt"
---
## rules
- Declare dependencies in the `imports` map of `deno.json`. Use `jsr:` or `npm:` specifiers.
- Use the standard library from JSR (`@std/...`).
- Grant only the permissions that the program needs.
- Keep `deno.lock` in git.

## never
- Do not run with `--allow-all` or `-A` in production.
