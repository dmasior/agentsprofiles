---
label: "Kotlin"
group: "languages"
aliases: ["kt"]
---
## rules
- Use `val` by default. Use `var` only when the value changes.
- Use nullable types and safe calls. Do not use the `!!` operator.
- Use data classes for values and sealed classes or interfaces for closed sets of states.
- Use coroutines with structured concurrency. Do not use `GlobalScope`.
- Use the Gradle wrapper (`./gradlew`) for builds and tests.
