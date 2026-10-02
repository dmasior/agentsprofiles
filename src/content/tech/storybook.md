---
label: "Storybook"
group: "frontend"
---
## rules
- Write stories in Component Story Format 3 (CSF3) with `args`.
- Add a story for each important state: default, loading, empty, error and disabled.
- Keep stories next to their components.
- Add `play` functions for interaction tests where behavior matters.
- Do not call real APIs in stories. Mock data at the network layer or with props.
