---
label: "NestJS"
group: "backend"
aliases: ["nest"]
---
## rules
- Organize code in feature modules.
- Validate DTOs with `class-validator` and a global `ValidationPipe`.
- Inject providers through constructors. Do not create services with `new`.
- Throw built-in HTTP exceptions and handle other errors with exception filters.
- Use `Test.createTestingModule` for unit tests.
