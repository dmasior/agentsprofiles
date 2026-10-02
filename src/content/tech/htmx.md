---
label: "HTMX"
group: "frontend"
---
## rules
- Return HTML fragments from endpoints that HTMX calls, not JSON.
- Use `hx-target` and `hx-swap` to make the update area explicit.
- Make each feature work as a normal link or form first, then add HTMX attributes.
- Include the CSRF token in HTMX requests that change data.
- Use the `HX-Request` header to choose between a full page and a fragment.
