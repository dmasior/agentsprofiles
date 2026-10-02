---
label: "Scala"
group: "languages"
commands:
  build: "sbt compile"
  test: "sbt test"
  format: "sbt scalafmtAll"
---
## rules
- Use `val` and immutable collections by default.
- Use `Option`, `Either` or `Try` for expected failures. Do not use `null`.
- Use case classes for data. Use sealed traits or Scala 3 `enum` for closed sets of types.
- Use the syntax style that the repo already uses (braces or indentation).
- Keep side effects at the edges. Use the effect library of the repo as it is already used.
