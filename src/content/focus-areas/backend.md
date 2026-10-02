---
label: "APIs and backend"
order: 1
scope: "When changing APIs or server-side code:"
---
## rules
- Validate all input at the API boundary.
- Keep handlers thin. Put business logic in a layer that you can test without HTTP or queues.
- Make database migrations backward compatible. Old and new code must work during a deploy.
- Use structured logs with a request ID. Do not log secrets or personal data.
- Set timeouts on all outbound network calls.
- Return errors in one consistent shape with correct status codes.

## ask-first
- Change a public API contract or a database schema.
