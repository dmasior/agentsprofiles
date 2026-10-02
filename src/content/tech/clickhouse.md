---
label: "ClickHouse"
group: "databases"
---
## rules
- Choose the `ORDER BY` key from the most common filter columns.
- Insert data in large batches. Do not insert one row at a time.
- Use `MergeTree` family engines for tables that store data.
- Use `LowCardinality` for string columns with few distinct values.
- Use materialized views for aggregations that queries read often.

## ask-first
- Drop or truncate a table or partition, or run `ALTER TABLE ... DELETE`.
