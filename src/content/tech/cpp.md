---
label: "C++"
group: "languages"
aliases: ["cplusplus"]
---
## rules
- Manage resources with RAII. Release them in destructors, not with manual cleanup code.
- Use `std::unique_ptr` and `std::shared_ptr`. Do not use raw `new` and `delete`.
- Prefer standard library containers and algorithms over custom code.
- Mark functions `const` and `noexcept` where they apply.
- Compile with `-Wall -Wextra` and fix all new warnings.

## ask-first
- Raise the C++ standard version or the minimum compiler version.
