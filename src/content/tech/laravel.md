---
label: "Laravel"
group: "backend"
commands:
  test: "php artisan test"
  run: "php artisan serve"
---
## rules
- Use eager loading (`with`) to avoid N+1 queries.
- Validate input with Form Request classes.
- Create a migration for each schema change with `php artisan make:migration`.
- Read config with `config()`. Use `env()` only in files in `config/`.
- Use queued jobs for slow work such as email and external API calls.

## never
- Do not edit a migration that already ran in production. Add a new migration.
