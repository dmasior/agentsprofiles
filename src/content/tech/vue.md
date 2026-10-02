---
label: "Vue"
group: "frontend"
aliases: ["vuejs"]
---
## rules
- Use the Composition API with `<script setup>`. <!-- not: legacy-maintenance -->
- Use `computed` for derived values. Use `watch` only for side effects.
- Define props and emits with `defineProps` and `defineEmits` and give them types. <!-- not: legacy-maintenance -->
- Do not change props. Emit an event to the parent instead.
- Give `v-for` items a stable `:key`. Do not use `v-if` and `v-for` on the same element.
