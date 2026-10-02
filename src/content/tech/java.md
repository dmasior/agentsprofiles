---
label: "Java"
group: "languages"
aliases: ["jvm"]
---
## rules
- Use the build wrapper of the repo (`./mvnw` or `./gradlew`).
- Use `Optional` for return values that can be absent. Do not return `null` from public methods.
- Use try-with-resources for every `AutoCloseable`.
- Prefer immutable objects. Use `record` for data carriers.
- Do not catch `Exception` or `Throwable` unless you rethrow it or log it with context.
