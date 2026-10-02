---
label: "Rust"
group: "languages"
aliases: ["rs"]
commands:
  build: "cargo build"
  test: "cargo test"
  lint: "cargo clippy -- -D warnings"
  format: "cargo fmt"
---
## rules
- Return `Result` for recoverable errors. Use `panic!` only for bugs.
- Do not call `unwrap()` or `expect()` outside tests and examples.
- Prefer borrowing over cloning. Clone only when ownership is needed.
- Keep `unsafe` blocks small and add a `// SAFETY:` comment that explains why they are sound.
- Fix all `clippy` warnings before you report a task as done.
