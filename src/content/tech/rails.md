---
label: "Ruby on Rails"
group: "backend"
aliases: ["ror"]
commands:
  test: "bin/rails test"
  lint: "bin/rubocop"
  run: "bin/rails server"
---
## rules
- Follow Rails conventions for names, folders and REST routes.
- Use strong parameters in controllers.
- Use `includes` to avoid N+1 queries.
- Commit `db/schema.rb` together with each migration.
- Put slow work in Active Job jobs.

## never
- Do not edit a migration that already ran in production. Add a new migration.
