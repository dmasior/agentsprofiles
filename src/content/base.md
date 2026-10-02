---
---
## rules
- Read the related code and docs before you change code.
- Keep each change small and focused on the task. Do not mix unrelated changes.
- Follow the existing code style, names and structure of the repo.
- Run the test, lint and build commands before you report a task as done.
- If a requirement is not clear, ask one specific question before you start.
- Add comments only for intent that the code does not show.
- In your report, say what you changed, what you checked and what you did not check.

## always
- Keep secrets, tokens and credentials out of code, logs and commits.

## ask-first
- Delete files, drop data or rewrite git history.
- Add, remove or upgrade a dependency. <!-- not: greenfield-mvp, internal-tools -->

## never
- Do not commit or push unless the user asks.
- Do not skip or disable tests to make a check pass.
