---
label: "Go"
group: "languages"
aliases: ["golang"]
commands:
  build: "go build ./..."
  test: "go test ./..."
  lint: "golangci-lint run"
  format: "gofmt -w ."
---
## rules
- Handle every error. Do not discard errors with `_`.
- Wrap errors with context, for example `fmt.Errorf("load user: %w", err)`.
- Pass `context.Context` as the first argument to functions that do I/O.
- Keep packages small and named by purpose. No `utils` or `common` packages.
- Use table-driven tests with `t.Run`.
- Prefer the standard library. Add a module only when it saves real work.

## never
- Do not start a goroutine without a way to stop it.
