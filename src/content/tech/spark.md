---
label: "Spark"
group: "data-ml"
aliases: ["pyspark"]
---
## rules
- Use the DataFrame API and built-in functions. Avoid Python UDFs where a built-in function exists.
- Define schemas explicitly when you read data. Do not rely on schema inference in production jobs.
- Do not call `collect()` on large data sets.
- Partition output data by columns that queries filter on.
- Broadcast small tables in joins.

## ask-first
- Overwrite a production table or partition.
