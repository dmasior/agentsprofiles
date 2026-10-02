---
label: "PHP"
group: "languages"
commands:
  install: "composer install"
---
## rules
- Add `declare(strict_types=1);` at the top of each new PHP file.
- Add type declarations to all parameters, return values and properties.
- Follow PSR-12 for code style and PSR-4 for autoloading.
- Use prepared statements for all SQL queries.
- Escape all output in templates.
