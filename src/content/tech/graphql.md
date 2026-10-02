---
label: "GraphQL"
group: "backend"
aliases: ["gql"]
---
## rules
- Keep the schema as the source of truth. Change the schema first.
- Use DataLoader or batching to avoid N+1 queries in resolvers.
- Mark fields with `@deprecated` before you remove them.
- Limit query depth and complexity on public endpoints.
- Return error codes in the `extensions` field of each error.

## ask-first
- Remove or rename a field or type in the schema.
