---
label: "React"
group: "frontend"
aliases: ["reactjs", "jsx"]
---
## rules
- Use function components and hooks.
- Derive values during render. Do not copy props into state.
- Use `useEffect` only to sync with external systems, not for data flow between components.
- Give list items stable `key` values. Do not use the array index for lists that change.
- Keep components pure. No side effects during render.
