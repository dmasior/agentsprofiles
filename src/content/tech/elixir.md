---
label: "Elixir"
group: "languages"
commands:
  install: "mix deps.get"
  build: "mix compile"
  test: "mix test"
  format: "mix format"
---
## rules
- Use pattern matching in function heads instead of nested conditionals.
- Return `{:ok, value}` or `{:error, reason}` from functions that can fail.
- Use `with` to chain steps that can fail.
- Run long-lived state in a process under a supervisor.
- Add `@doc` and `@spec` to public functions.
