---
label: "Greenfield - prototype / MVP"
order: 3
description: "New project. Speed first. Keep it simple, accept some debt."
summary: "New project at prototype or MVP stage. Speed of delivery is the priority. Keep the design simple and accept some technical debt, but keep the code easy to change."
---
## rules
- Choose the simplest solution that works. Do not build for future needs.
- Prefer well-known libraries over custom code.
- Write tests for core business logic. Skip tests for throwaway code.
- Mark known shortcuts with a short `TODO:` comment that says why.

## never
- Do not add abstractions, layers or config options without a current need.
