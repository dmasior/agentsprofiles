---
label: "Hugging Face Transformers"
group: "data-ml"
aliases: ["hf", "transformers"]
---
## rules
- Pin the model id and revision when you load a model.
- Use `AutoTokenizer` and `AutoModel` classes that match the checkpoint.
- Run inference inside `torch.no_grad()` or `torch.inference_mode()`.
- Batch inputs and set padding and truncation explicitly.
- Check the license of each model and dataset before you use it.

## never
- Do not load models with `trust_remote_code=True` without review.
