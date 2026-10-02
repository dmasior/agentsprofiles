---
label: "Docker"
group: "infra"
aliases: ["container", "compose"]
commands:
  run: "docker compose up"
---
## rules
- Pin base images to a specific version tag, not `latest`.
- Use multi-stage builds. Keep build tools out of the final image.
- Run the app as a non-root user.
- Add a `.dockerignore` file and keep secrets out of the build context.
- Order `Dockerfile` steps so that dependency layers are cached before source code changes.
