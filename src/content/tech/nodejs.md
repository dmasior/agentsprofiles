---
label: "Node.js"
group: "backend"
aliases: ["node"]
---
## rules
- Use the Node.js version from `.nvmrc`, `.node-version` or `engines` in `package.json`.
- Import built-in modules with the `node:` prefix, for example `node:fs/promises`.
- Do not use sync file or crypto APIs in request handlers.
- Handle `SIGTERM`. Close servers and connections before the process exits.
- Read config from environment variables at startup. Fail fast when a value is missing.
