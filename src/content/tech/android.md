---
label: "Android (Jetpack Compose)"
group: "mobile"
aliases: ["compose", "jetpack"]
commands:
  build: "./gradlew assembleDebug"
  test: "./gradlew test"
  lint: "./gradlew lint"
---
## rules
- Build new UI with Jetpack Compose. <!-- not: legacy-maintenance -->
- Hoist state out of composables. Pass state down and events up.
- Keep UI state in a `ViewModel` and expose it as `StateFlow`.
- Collect flows in composables with `collectAsStateWithLifecycle()`.
- Put strings in `strings.xml`. Do not hard-code user-visible text.
- Add a `@Preview` for each new screen component.
