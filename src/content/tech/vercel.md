---
label: "Vercel"
group: "infra"
---
## rules
- Keep project settings in `vercel.json` or the framework config, not only in the dashboard.
- Store environment variables in Vercel per environment. Do not commit `.env` files.
- Use preview deployments to check changes before production.
- Set cache headers and revalidation on purpose for each route.

## ask-first
- Promote a deployment to production or change production domains.
