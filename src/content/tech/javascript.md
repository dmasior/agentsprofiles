---
label: "JavaScript"
group: "languages"
aliases: ["js", "ecmascript"]
---
## rules
- Use ES modules (`import` and `export`), unless the project uses CommonJS.
- Use `const` by default and `let` only when the value changes. Do not use `var`.
- Use `===` and `!==` for comparisons.
- Handle every Promise rejection. Use `async` and `await` with `try` and `catch`.
- Use the package manager that the lock file shows. Do not mix npm, pnpm and yarn.
