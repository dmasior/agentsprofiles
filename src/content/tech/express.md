---
label: "Express"
group: "backend"
aliases: ["expressjs"]
---
## rules
- Pass errors to one central error-handling middleware.
- Make sure every rejected promise in a handler reaches the error middleware.
- Validate `req.body`, `req.params` and `req.query` with a schema.
- Use `helmet` and set body size limits on public apps.
