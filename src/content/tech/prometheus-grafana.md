---
label: "Prometheus / Grafana"
group: "infra"
aliases: ["prometheus", "grafana", "metrics"]
---
## rules
- Follow Prometheus naming: base units and suffixes such as `_seconds` and `_total`.
- Do not use labels with unbounded values such as user IDs or URLs.
- Use histograms for latency.
- Keep dashboards and alert rules in git as code.
- Write alerts on symptoms that users notice, with a link to a runbook.
