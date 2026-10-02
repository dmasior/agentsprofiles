---
label: "MySQL"
group: "databases"
aliases: ["mariadb"]
---
## rules
- Write every schema change as a migration file.
- Use `utf8mb4` for character sets and its collations.
- Add an index for each foreign key and each frequent filter column. Check queries with `EXPLAIN`.
- Use InnoDB tables and transactions for changes that need more than one statement.
- Use parameterized queries in all application code.

## ask-first
- Run a migration that locks or rewrites a large table. <!-- not: greenfield-mvp -->
