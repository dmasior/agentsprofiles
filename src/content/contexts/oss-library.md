---
label: "Open-source library / package"
order: 6
description: "Public API stability, semver, changelog, backward compatibility."
summary: "Open-source library or package that other projects use. Public API stability, semantic versioning and clear docs are the priority."
---
## rules
- Treat every exported symbol as public API.
- Follow semantic versioning. A breaking change needs a major version.
- Update the changelog and docs for each user-visible change.
- Keep the dependency list small. Prefer the standard library.
- Add tests and an example for each new public feature.

## ask-first
- Make a breaking change or deprecate an API.

## never
- Do not add telemetry or network calls without an opt-in.
