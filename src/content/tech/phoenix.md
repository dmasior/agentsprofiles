---
label: "Phoenix"
group: "backend"
commands:
  run: "mix phx.server"
---
## rules
- Keep business logic in contexts. Controllers and LiveViews call context functions.
- Validate and cast data with Ecto changesets.
- Create a migration with `mix ecto.gen.migration` for each schema change.
- Use verified routes (`~p`) for paths.
- Test LiveViews with `Phoenix.LiveViewTest`.
