---
label: "ASP.NET Core"
group: "backend"
aliases: ["dotnet", ".net", "aspnet"]
---
## rules
- Register services with dependency injection and the correct lifetime.
- Accept a `CancellationToken` in endpoints and pass it to I/O calls.
- Bind settings with the options pattern (`IOptions<T>`).
- Use `ILogger<T>` with message templates, not string interpolation.
- Return errors as `ProblemDetails`.
