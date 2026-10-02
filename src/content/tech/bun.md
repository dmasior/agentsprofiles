---
label: "Bun"
group: "backend"
commands:
  install: "bun install"
  test: "bun test"
---
## rules
- Keep `bun.lock` in git.
- Write tests with `bun:test`.
- Use Bun-only APIs such as `Bun.file` and `Bun.serve` only in code that does not need to run on Node.js.
- Check that a package works with Bun before you add it.
