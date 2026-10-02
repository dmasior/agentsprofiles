---
label: "pandas"
group: "data-ml"
---
## rules
- Use vectorized operations. Do not loop over rows with `iterrows`.
- Use `.loc` for assignment. Do not use chained indexing.
- Set `dtype` and parse dates explicitly when you read files.
- Do not use `inplace=True`. Assign the result instead.
- Check row counts and nulls after each merge.
