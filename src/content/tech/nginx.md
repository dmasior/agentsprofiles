---
label: "Nginx"
group: "infra"
---
## rules
- Test config with `nginx -t` before you reload.
- Set security headers and hide the server version with `server_tokens off`.
- Set timeouts and body size limits (`client_max_body_size`) on purpose.
- Forward the client IP and scheme to upstreams with `X-Forwarded-For` and `X-Forwarded-Proto`.
- Keep TLS settings current. Turn off old protocols such as TLS 1.0 and 1.1.
