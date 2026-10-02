---
label: "Svelte"
group: "frontend"
---
## rules
- Use runes (`$state`, `$derived`, `$effect`, `$props`) in new components. <!-- not: legacy-maintenance -->
- Use `$derived` for computed values. Use `$effect` only to sync with external systems. <!-- not: legacy-maintenance -->
- Pass callback props instead of `createEventDispatcher` in new code. <!-- not: legacy-maintenance -->
- Use shared stores only for state that many components share.
- Keep component styles scoped. Use `:global` only when there is no other way.
