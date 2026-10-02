---
label: "Testing Library"
group: "testing"
aliases: ["rtl"]
---
## rules
- Query by role, label or text. Use `getByTestId` only when no other query fits.
- Use `userEvent` instead of `fireEvent` for user actions.
- Use `findBy` queries or `waitFor` for async changes.
- Assert on what the user sees. Do not test component internals or state.
- Use `screen` for queries instead of destructuring the render result.
