---
label: "Django"
group: "backend"
commands:
  test: "python manage.py test"
  run: "python manage.py runserver"
---
## rules
- Put business logic in models or service modules, not in views or templates.
- Create a migration for each model change with `python manage.py makemigrations`. Commit the migration file.
- Use `select_related` and `prefetch_related` to avoid N+1 queries.
- Validate input with forms or serializers.
- Read secrets and environment-specific settings from environment variables.

## never
- Do not edit a migration that already ran in production. Add a new migration.
