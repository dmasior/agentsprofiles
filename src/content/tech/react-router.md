---
label: "React Router / Remix"
group: "frontend"
aliases: ["remix"]
---
## rules
- Load data in route `loader` functions and change data in `action` functions.
- Use `<Form>` and `useFetcher` for mutations instead of manual `fetch` calls.
- Throw responses from loaders for not found and unauthorized cases.
- Add an `ErrorBoundary` to routes that can fail.
- Keep server-only code in `.server.ts` files.
