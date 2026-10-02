---
label: "Redis"
group: "databases"
aliases: ["valkey"]
---
## rules
- Set a TTL on every cache key.
- Use a key prefix per feature, for example `session:<id>`.
- Use `SCAN` instead of `KEYS` in application code.
- Treat cache data as lost at any time. The app must work when a key is missing.
- Keep values small. Store large objects somewhere else.

## never
- Do not run `FLUSHALL` or `FLUSHDB` on a shared or production instance.
