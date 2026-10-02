---
label: "Helm"
group: "infra"
---
## rules
- Keep default values in `values.yaml` and override them per environment in separate files.
- Run `helm lint` and `helm template` before you commit chart changes.
- Bump the chart `version` for every chart change.
- Use helpers in `_helpers.tpl` for repeated names and labels.
- Pin dependency chart versions in `Chart.yaml`.

## ask-first
- Run `helm upgrade` or `helm uninstall` on a production release.
