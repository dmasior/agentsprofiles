---
label: "Ruby"
group: "languages"
aliases: ["rb"]
commands:
  install: "bundle install"
---
## rules
- Follow the RuboCop config of the repo.
- Add the `# frozen_string_literal: true` comment to new files.
- Prefer small methods and guard clauses over deep nesting.
- Run gem commands with `bundle exec`.

## never
- Do not monkey-patch core classes.
