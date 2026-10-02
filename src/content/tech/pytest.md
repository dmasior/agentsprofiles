---
label: "pytest"
group: "testing"
commands:
  test: "pytest"
---
## rules
- Name test files `test_*.py`. Keep them in `tests/` or next to the code, as the repo already does.
- Use fixtures for setup. Keep fixtures small and close to the tests that use them.
- Use `pytest.mark.parametrize` for input variations.
- Use `tmp_path` and `monkeypatch` instead of real files and global state.
- Do not call the network in unit tests. Mock external services.
