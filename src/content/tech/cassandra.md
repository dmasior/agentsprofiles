---
label: "Cassandra"
group: "databases"
---
## rules
- Design each table for one query pattern. Choose the partition key from that query.
- Keep partitions bounded in size. Add a time bucket to the key for time series data.
- Do not use `ALLOW FILTERING` in application queries.
- Use prepared statements and set the consistency level on purpose.
- Prefer TTLs over large deletes, because deletes create tombstones.

## ask-first
- Change a primary key, drop a table or run a bulk delete.
