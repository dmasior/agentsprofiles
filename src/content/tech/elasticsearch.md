---
label: "Elasticsearch"
group: "databases"
aliases: ["elastic", "opensearch"]
---
## rules
- Define explicit mappings for each index. Do not rely on dynamic mapping in production.
- Use `keyword` for exact match and aggregations, `text` for full-text search.
- Write through an alias so that you can reindex without downtime.
- Use the bulk API for large writes.
- Use `search_after` for deep pagination, not large `from` values.

## ask-first
- Delete an index or run a reindex on production data.
