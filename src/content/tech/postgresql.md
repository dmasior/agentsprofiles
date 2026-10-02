---
label: "PostgreSQL"
group: "databases"
aliases: ["postgres", "psql", "pg"]
---
## rules
- Write every schema change as a migration file. Do not change the schema by hand.
- Add an index for each foreign key and each frequent filter column.
- Use `timestamptz` for timestamps. Use `text` instead of `varchar(n)` unless a limit is required.
- Use a transaction for changes that need more than one statement.
- Check slow queries with `EXPLAIN ANALYZE` before you add an index.

## ask-first
- Run a migration that locks or rewrites a large table. <!-- not: greenfield-mvp -->
