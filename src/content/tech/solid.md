---
label: "Solid"
group: "frontend"
aliases: ["solidjs"]
---
## rules
- Do not destructure props. Read them as `props.name` to keep reactivity.
- Use `createSignal` for state and `createMemo` for derived values.
- Use `<Show>` and `<For>` for conditional and list rendering.
- Use `createResource` for async data.
- Remember that component functions run once. Put reactive reads inside JSX or effects.
