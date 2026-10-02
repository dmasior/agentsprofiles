---
label: "DynamoDB"
group: "databases"
aliases: ["dynamo"]
---
## rules
- Design keys from access patterns. List the access patterns before you change the table.
- Use `Query` on keys or indexes. Do not use `Scan` in request paths.
- Use condition expressions for writes that must not overwrite data.
- Use batch and transaction APIs for writes that belong together.
- Handle pagination with `LastEvaluatedKey`.

## ask-first
- Delete a table, change keys or add a global secondary index on a large table.
