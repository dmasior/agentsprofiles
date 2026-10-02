---
label: "Cloudflare"
group: "infra"
aliases: ["workers"]
---
## rules
- Configure Workers in `wrangler.toml` or `wrangler.jsonc` and keep the file in git.
- Store secrets with `wrangler secret put`. Do not put them in config files.
- Use Web APIs (`fetch`, `Request`, `Response`). Do not use Node.js-only APIs without the compatibility flag.
- Test Workers locally with `wrangler dev` before you deploy.

## ask-first
- Change DNS records, WAF rules or production routes.
