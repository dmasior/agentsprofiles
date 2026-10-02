---
label: "Airflow"
group: "data-ml"
---
## rules
- Keep DAG files light. Do not run heavy work or queries at import time.
- Make each task idempotent and safe to retry.
- Use the logical date and data intervals for time ranges. Do not use the current time.
- Store credentials in Airflow connections or a secrets backend.
- Use the TaskFlow API (`@dag`, `@task`) for new Python DAGs. <!-- not: legacy-maintenance -->

## ask-first
- Run a backfill or clear tasks for many past dates.
