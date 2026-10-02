---
label: "Flask"
group: "backend"
commands:
  run: "flask run"
---
## rules
- Use the application factory pattern (`create_app`).
- Organize routes with blueprints.
- Load config from environment variables. Do not commit `SECRET_KEY`.
- Validate `request.json` and form data with a schema before you use it.
- Test routes with `app.test_client()`.
