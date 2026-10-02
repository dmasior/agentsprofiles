---
label: "iOS (SwiftUI)"
group: "mobile"
aliases: ["swiftui", "xcode"]
---
## rules
- Build new screens with SwiftUI. <!-- not: legacy-maintenance -->
- Use the `@Observable` macro for view models in new code, as the deployment target allows. <!-- not: legacy-maintenance -->
- Keep views small. Move logic out of `body` into view models or helpers.
- Run UI updates on the main actor.
- Add a `#Preview` for each new view.
- Use `String(localized:)` or string catalogs for user-visible text.
