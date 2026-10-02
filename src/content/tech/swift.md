---
label: "Swift"
group: "languages"
commands:
  build: "swift build"
  test: "swift test"
---
## rules
- Use `let` by default. Use `var` only when the value changes.
- Unwrap optionals with `if let`, `guard let` or `??`. Do not force unwrap with `!`.
- Use `async` and `await` and actors for new asynchronous code. <!-- not: legacy-maintenance -->
- Prefer value types (`struct`, `enum`) over classes when identity is not needed.
- Mark types and members `private` or `internal` unless they are public API.
