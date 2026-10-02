---
label: "Angular"
group: "frontend"
aliases: ["ng"]
---
## rules
- Use standalone components. Do not add new `NgModule` classes. <!-- not: legacy-maintenance -->
- Use signals for local state and `computed` for derived values. <!-- not: legacy-maintenance -->
- Use the built-in control flow (`@if`, `@for`) with a `track` expression in `@for`. <!-- not: legacy-maintenance -->
- Set `changeDetection: ChangeDetectionStrategy.OnPush` on new components. <!-- not: legacy-maintenance -->
- Inject dependencies with `inject()` or constructor injection. Do not create services with `new`.
- Generate new code with `ng generate` so that files follow the project schematics.
