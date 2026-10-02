---
label: "C"
group: "languages"
---
## rules
- Compile with `-Wall -Wextra` and fix all new warnings.
- Check the return value of every call that can fail, such as `malloc`, `fopen` and `read`.
- Give each allocation one clear owner that frees it.
- Use bounded functions such as `snprintf`. Do not use `gets`, `strcpy` or `sprintf`.
- Run tests with `-fsanitize=address,undefined` when the toolchain supports it.
