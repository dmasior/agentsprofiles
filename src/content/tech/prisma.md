---
label: "Prisma"
group: "databases"
---
## rules
- Change the schema in `schema.prisma` and create a migration with `prisma migrate dev`.
- Commit migration files. Do not edit migrations that already ran.
- Use `select` or `include` to load only the fields and relations that the code needs.
- Use one shared `PrismaClient` instance per process.
- Use `$transaction` for writes that belong together.

## never
- Do not run `prisma migrate reset` or `prisma db push` against production.
