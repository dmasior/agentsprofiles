---
label: "scikit-learn"
group: "data-ml"
aliases: ["sklearn"]
---
## rules
- Put preprocessing and the model in one `Pipeline`.
- Fit transformers on training data only. Do not fit on test data.
- Set `random_state` for each estimator and split.
- Use cross-validation to compare models.
- Save fitted pipelines with `joblib` and record the scikit-learn version.
