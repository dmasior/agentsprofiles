---
label: "Jest"
group: "testing"
commands:
  test: "npx jest"
---
## rules
- Use `describe` blocks that match the unit under test and `it` names that describe behavior.
- Reset mocks between tests with `clearMocks` or `restoreMocks` in the config.
- Use fake timers for code that depends on time.
- Mock only module boundaries such as network and file system.
- Do not add snapshot tests for large objects. Assert on the values that matter.
