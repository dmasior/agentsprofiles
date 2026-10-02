---
label: "Internal tools / scripts"
order: 8
description: "Small tools for a team. Practical, readable, low ceremony."
summary: "Internal tools and scripts for a team. Practical results and readable code are more important than full coverage or strict process."
---
## rules
- Keep tools small, readable and easy to run.
- Document how to run each tool and its inputs in a short README or usage text.
- Fail with a clear error message. Do not fail silently.
- Make scripts safe to run twice where possible.

## never
- Do not hard-code credentials, production hostnames or personal paths.
