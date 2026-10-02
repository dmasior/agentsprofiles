---
label: "Next.js"
group: "frontend"
aliases: ["next"]
---
## rules
- Use the App Router. Put new routes in `app/`, not `pages/`. <!-- not: legacy-maintenance -->
- Keep components as Server Components. Add `"use client"` only where a component needs state, effects or browser APIs. <!-- not: legacy-maintenance -->
- Fetch data on the server. Do not fetch data in `useEffect` when a Server Component can load it. <!-- not: legacy-maintenance -->
- Use `next/image` for images and `next/link` for internal links.
- Keep secrets in server-only code. Expose only variables with the `NEXT_PUBLIC_` prefix to the client.
