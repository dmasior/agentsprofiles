---
label: "Legacy - active modernization"
order: 2
description: "Improve and rework step by step. Refactors allowed with tests."
summary: "Legacy codebase under active modernization. Improvements and reworks are allowed, step by step, with tests that protect current behavior."
---
## rules
- Add or confirm tests that cover current behavior before you refactor.
- Refactor in small steps. Each step must build and pass tests.
- Keep refactor changes separate from behavior changes.
- Use the target patterns of the modernization in new code, not the old patterns.
- Remove dead code only when you can prove that nothing uses it.

## ask-first
- Remove or replace a module, framework or public interface.
- Start a migration that touches many files.
