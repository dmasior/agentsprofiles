---
label: "Polars"
group: "data-ml"
---
## rules
- Use the lazy API (`scan_*` and `.collect()`) for large data.
- Use expressions (`pl.col`) instead of Python functions in `map_elements`.
- Set the schema or `dtypes` explicitly when you read files.
- Chain operations in one query so that Polars can optimize the plan.
