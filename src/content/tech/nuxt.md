---
label: "Nuxt"
group: "frontend"
aliases: ["nuxtjs"]
---
## rules
- Fetch data with `useFetch` or `useAsyncData`, not in `onMounted`.
- Rely on auto-imports for components and composables. Do not add manual imports for them.
- Put server code in `server/api` and `server/routes`.
- Read config with `useRuntimeConfig()`. Keep secrets outside the `public` key.
- Use `useState` for shared state that must work with server rendering.
