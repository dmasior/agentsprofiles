---
label: "Kubernetes"
group: "infra"
aliases: ["k8s"]
---
## rules
- Set CPU and memory requests and limits for every container.
- Add readiness and liveness probes to every service.
- Pin image tags or digests. Do not use `latest`.
- Run containers as non-root with a read-only root file system where possible.
- Keep secrets in Kubernetes Secrets or an external secret store, not in manifests.

## ask-first
- Apply changes to a production cluster or delete namespaces, volumes or CRDs.
