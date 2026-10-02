---
label: "Data pipelines"
order: 5
scope: "When changing data pipelines or datasets:"
---
## rules
- Make pipelines idempotent. A re-run must not duplicate or lose data.
- Define and check schemas at pipeline inputs and outputs.
- Add data quality checks for nulls, duplicates and value ranges.
- Keep all transformations in version control. Do not fix production tables by hand.
- Document the source, owner and refresh schedule of each dataset.

## ask-first
- Backfill, delete or rewrite production data.
