---
label: "dbt"
group: "data-ml"
commands:
  build: "dbt build"
  test: "dbt test"
---
## rules
- Use `ref()` and `source()` for every table reference. Do not hard-code schema names.
- Follow the layer structure of the project, for example staging, intermediate and marts.
- Add `unique` and `not_null` tests to primary keys.
- Document models and columns in YAML files.
- Use incremental models for large tables, with a unique key.

## ask-first
- Run with `--full-refresh` on large production models.
