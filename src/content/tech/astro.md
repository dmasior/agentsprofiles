---
label: "Astro"
group: "frontend"
---
## rules
- Render static HTML by default. Add a `client:*` directive only to components that need interactivity.
- Prefer `client:visible` or `client:idle` over `client:load` for components that are not critical.
- Define content collections with a schema in `src/content.config.ts`.
- Use the `<Image />` component from `astro:assets` for local images.
- Keep secrets in server-only code. Expose only variables with the `PUBLIC_` prefix to the client.
