---
label: "Flutter"
group: "mobile"
commands:
  install: "flutter pub get"
  test: "flutter test"
  lint: "flutter analyze"
  run: "flutter run"
---
## rules
- Split large `build` methods into small widgets.
- Use `const` constructors for widgets wherever possible.
- Use the state management approach that the repo already uses. Do not add a second one.
- Do not call async work in `build`. Start it in `initState` or in the state layer.
- Write widget tests with `testWidgets` for new screens.
