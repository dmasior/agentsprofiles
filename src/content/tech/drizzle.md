---
label: "Drizzle ORM"
group: "databases"
---
## rules
- Define the schema in TypeScript and generate migrations with `drizzle-kit generate`.
- Commit generated migration files. Do not edit migrations that already ran.
- Use the query builder or the `sql` template tag with parameters. Do not build SQL from strings.
- Define relations in the schema to load related rows in one query.
- Infer types from the schema with `$inferSelect` and `$inferInsert`.

## never
- Do not run `drizzle-kit push` against production.
