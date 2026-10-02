---
label: "Vitest"
group: "testing"
commands:
  test: "npx vitest run"
---
## rules
- Import test APIs from `vitest` explicitly, unless the repo uses globals.
- Use `vi.mock` only for module boundaries such as network and file system.
- Restore mocks between tests with `restoreMocks` in the config or `vi.restoreAllMocks()`.
- Use `vi.useFakeTimers()` for code that depends on time.
- Use `test.each` for input variations.
