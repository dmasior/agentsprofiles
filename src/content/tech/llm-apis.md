---
label: "LLM APIs"
group: "data-ml"
aliases: ["llm", "openai", "anthropic", "claude", "gpt"]
---
## rules
- Keep model ids in config. Do not hard-code them in many places.
- Set timeouts and retry rate limit and server errors with backoff.
- Set token limits and track token use and cost.
- Validate structured output against a schema before you use it.
- Keep prompts in version control and test them with fixed examples.

## never
- Do not put secrets or personal data in prompts or logs.
