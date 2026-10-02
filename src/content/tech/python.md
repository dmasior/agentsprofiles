---
label: "Python"
group: "languages"
aliases: ["py"]
---
## rules
- Add type hints to all public functions.
- Use `pathlib` for file paths.
- Raise specific exceptions. Do not use a bare `except:`.
- Use the dependency tool of the repo (uv, Poetry or pip) and keep its lock file in sync.
- Use `logging` instead of `print` in library and service code.
- Keep code compatible with the Python version in `pyproject.toml`.
