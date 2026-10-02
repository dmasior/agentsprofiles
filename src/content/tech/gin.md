---
label: "Gin"
group: "backend"
---
## rules
- Bind input with `ShouldBindJSON` or `ShouldBindQuery` and handle the error.
- Pass `c.Request.Context()` to downstream calls so that cancel and timeouts work.
- Group routes with `router.Group` and attach middleware per group.
- Set `gin.SetMode(gin.ReleaseMode)` in production.
- Test handlers with `httptest.NewRecorder`.
