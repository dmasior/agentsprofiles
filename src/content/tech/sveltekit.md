---
label: "SvelteKit"
group: "frontend"
---
## rules
- Load data in `+page.server.ts` or `+page.ts` `load` functions.
- Handle mutations with form actions in `+page.server.ts`.
- Keep secrets in `$env/static/private` or `$env/dynamic/private`. Do not import them in client code.
- Put shared server code in `$lib/server` so that it cannot reach the client.
- Use `error()` and `redirect()` from `@sveltejs/kit` for error and redirect responses.
