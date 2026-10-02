---
label: "Legacy - maintenance only"
order: 1
description: "Fix bugs and keep it running. No refactors. Smallest safe change."
summary: "Legacy codebase in maintenance mode. The goal is to keep it running and fix defects with minimum risk. Stability is more important than code quality improvements."
---
## rules
- Make the smallest change that fixes the problem.
- Match the existing patterns, even if they are outdated.
- Add a regression test for each bug fix when the area has tests.
- Explain the risk of each change in your report.

## ask-first
- Change public interfaces, database schemas or config formats.

## never
- Do not refactor, rename or reformat code that the task does not need.
- Do not upgrade frameworks or language versions.
