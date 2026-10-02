---
label: "ML and AI"
order: 6
scope: "When changing models, experiments or AI integrations:"
---
## rules
- Fix random seeds and record library versions for each experiment.
- Keep training, evaluation and inference code separate.
- Evaluate on a held-out set that training never sees.
- Track parameters, metrics and artifacts for each run.
- Keep LLM prompts in version control and test them with fixed examples.

## never
- Do not send sensitive data to external model APIs without approval.
