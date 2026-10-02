---
label: "Dart"
group: "languages"
commands:
  install: "dart pub get"
  test: "dart test"
  lint: "dart analyze"
  format: "dart format ."
---
## rules
- Use sound null safety. Use the `!` operator only when a value cannot be null.
- Use `final` for variables and fields that do not change.
- Use `async` and `await` instead of `Future.then` chains.
- Follow the lint rules in `analysis_options.yaml`. Do not add `// ignore:` comments without a reason.
- Add `///` doc comments to public APIs.
