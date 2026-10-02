---
label: "OpenAPI / REST"
group: "backend"
aliases: ["rest", "swagger"]
---
## rules
- Update the OpenAPI spec in the same change as the code.
- Use nouns for resource paths and HTTP methods for actions.
- Use correct status codes: `201` for create, `204` for no content, `4xx` for client errors.
- Add pagination to list endpoints.
- Add new fields instead of changing the type or meaning of existing fields.

## ask-first
- Remove an endpoint or field, or change its type.
