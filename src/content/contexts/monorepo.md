---
label: "Monorepo - mixed projects"
order: 5
description: "Many apps and packages in one repo. Respect boundaries and local conventions."
summary: "Monorepo with several apps and packages, possibly in different stacks. Each package has its own conventions. Changes must respect package boundaries."
---
## rules
- Find the package that owns the code before you change it. Follow the conventions of that package.
- Read the nearest AGENTS.md or README in the package directory.
- Run checks for the changed packages and for the packages that depend on them.
- Import shared code only through the public entry point of a package.

## ask-first
- Change shared packages, root config or workspace tooling.

## never
- Do not copy code between packages. Move shared code to a shared package.
