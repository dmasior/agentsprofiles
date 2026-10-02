---
label: "Symfony"
group: "backend"
commands:
  test: "php bin/phpunit"
  run: "symfony server:start"
---
## rules
- Use autowiring and constructor injection for services.
- Validate input with the Validator component and constraint attributes.
- Create a Doctrine migration with `php bin/console make:migration` for each entity change.
- Define routes with the `#[Route]` attribute.
- Store secrets in the Symfony secrets vault or in environment variables. Do not commit `.env.local`.
