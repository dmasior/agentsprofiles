---
label: "JUnit"
group: "testing"
---
## rules
- Use JUnit 5 (Jupiter) annotations for new tests. <!-- not: legacy-maintenance -->
- Use `@ParameterizedTest` for input variations.
- Use `assertThrows` to check exceptions.
- Use AssertJ or the assertion library that the repo already uses.
- Name test methods after the behavior, or use `@DisplayName`.
