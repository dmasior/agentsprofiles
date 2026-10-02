---
label: "FastAPI"
group: "backend"
commands:
  run: "fastapi dev"
---
## rules
- Define request and response models with Pydantic.
- Use `Depends` for shared resources such as database sessions and auth.
- Use `async def` only when all I/O inside is async. Use `def` for blocking code.
- Set `response_model` and status codes on each route.
- Test routes with `TestClient` or `httpx.AsyncClient`.
