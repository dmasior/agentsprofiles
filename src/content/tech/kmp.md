---
label: "Kotlin Multiplatform"
group: "mobile"
aliases: ["kmm"]
---
## rules
- Put shared business logic in `commonMain`. Keep platform code in `androidMain` and `iosMain`.
- Use `expect` and `actual` only for small platform APIs. Prefer interfaces with platform implementations.
- Use only multiplatform libraries in `commonMain`.
- Write tests for shared code in `commonTest`.
- Keep the API that iOS uses simple. Avoid generics and sealed hierarchies that do not map well to Swift.
