---
label: "SQLite"
group: "databases"
---
## rules
- Turn on foreign keys with `PRAGMA foreign_keys = ON` for each connection.
- Use WAL mode (`PRAGMA journal_mode = WAL`) for apps with concurrent reads.
- Wrap many writes in one transaction.
- Use parameter placeholders (`?`) for all values.
- Set a busy timeout so that writers wait instead of failing at once.
