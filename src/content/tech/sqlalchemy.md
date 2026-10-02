---
label: "SQLAlchemy"
group: "databases"
aliases: ["alembic"]
---
## rules
- Use SQLAlchemy 2.0 style: `select()` and `Session.execute()`, typed models with `Mapped`. <!-- not: legacy-maintenance -->
- Create an Alembic migration for each model change and review the generated file.
- Manage sessions with a context manager. Do not share a session between threads or requests.
- Use `selectinload` or `joinedload` to avoid N+1 queries.
- Use bound parameters. Do not build SQL with string formatting.

## never
- Do not edit an Alembic migration that already ran in production.
