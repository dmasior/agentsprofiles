---
label: "MongoDB"
group: "databases"
aliases: ["mongo"]
---
## rules
- Define a schema in the application layer or with collection validation rules.
- Add indexes for each frequent query. Check queries with `explain()`.
- Embed data that is read together. Reference data that grows without limit.
- Use transactions for writes that must change more than one document together.
- Pass user input as values in query objects, never as operators.

## ask-first
- Drop a collection or run `deleteMany` or `updateMany` on production data.
