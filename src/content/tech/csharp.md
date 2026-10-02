---
label: "C#"
group: "languages"
aliases: ["dotnet", ".net"]
commands:
  build: "dotnet build"
  test: "dotnet test"
  format: "dotnet format"
---
## rules
- Enable nullable reference types and fix all nullable warnings.
- Use `async` and `await` for I/O. Do not block on tasks with `.Result` or `.Wait()`.
- Pass a `CancellationToken` to async methods that do I/O.
- Use `using` declarations for `IDisposable` objects.
- Use `record` types for immutable data.
