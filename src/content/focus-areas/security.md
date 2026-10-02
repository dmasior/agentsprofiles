---
label: "Security"
order: 8
scope: "When changing input handling, data access, authentication or security controls:"
---
## rules
- Treat all external input as untrusted. Validate input and encode output.
- Use parameterized queries. Do not build queries with string concatenation.
- Check authorization on the server for every protected action.
- Use well-known crypto libraries. Do not write custom crypto.
- List new attack surface in your report.

## never
- Do not disable security checks, TLS verification or CSRF protection.
