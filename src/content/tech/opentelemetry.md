---
label: "OpenTelemetry"
group: "infra"
aliases: ["otel", "tracing"]
---
## rules
- Use the OpenTelemetry SDK and auto-instrumentation before you add manual spans.
- Follow semantic conventions for span and attribute names.
- Propagate trace context across service calls and message queues.
- Set `service.name` and environment as resource attributes.
- Do not put personal data or secrets in span attributes.
