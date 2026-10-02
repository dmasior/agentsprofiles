---
label: "Vite"
group: "frontend"
---
## rules
- Expose only environment variables with the `VITE_` prefix to client code.
- Keep `vite.config.ts` small. Add a plugin only when a built-in feature does not cover the need.
- Use `import.meta.env` for environment values, not `process.env`.
- Put static files that need a fixed path in `public/`. Import all other assets from source.
