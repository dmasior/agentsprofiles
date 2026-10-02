---
label: "Supabase"
group: "infra"
---
## rules
- Turn on Row Level Security for every table and write policies for each role.
- Change the database schema only with migrations in `supabase/migrations`.
- Use the anon key in client code. Use the service role key only on the server.
- Generate TypeScript types from the database schema after each migration.
- Use the local Supabase stack (`supabase start`) for development and tests.

## never
- Do not expose the service role key to the browser or mobile app.
