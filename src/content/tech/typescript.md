---
label: "TypeScript"
group: "languages"
aliases: ["ts"]
---
## rules
- Keep `strict` mode on in `tsconfig.json`.
- Do not use `any`. Use `unknown` and narrow the type.
- Do not use `@ts-ignore`. If you must, use `@ts-expect-error` with a reason.
- Type exported functions. Let TypeScript infer local variables.
- Prefer unions of string literals over `enum`.
- Validate external data at runtime before you trust its type.
