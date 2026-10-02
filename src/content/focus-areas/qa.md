---
label: "Testing"
order: 7
scope: "When writing tests or fixing bugs:"
---
## rules
- Test behavior, not implementation details.
- Make each test independent. It must give the same result on every run.
- Cover edge cases: empty input, limits, invalid input and error paths.
- Name each test after the behavior that it checks.
- Reproduce a bug with a failing test before you fix it.

## never
- Do not use fixed sleeps in functional or UI tests. Wait for a condition.
