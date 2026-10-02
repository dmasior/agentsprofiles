---
label: "Regulated environment"
order: 9
description: "Finance, health or similar. Audit trail, data protection, strict review."
summary: "Software in a regulated environment such as finance or health. Changes need traceability, data protection and strict review."
---
## rules
- Link each change to a ticket or requirement in the commit message.
- Treat personal and sensitive data as restricted. Do not log it.
- Keep audit logging intact for every action that changes data.
- Add tests for each change in validation, permissions and data handling.
- Use only approved libraries and services.

## always
- Mark changes in security, permissions or data handling for human review.

## ask-first
- Change data retention, encryption, access control or audit logic.

## never
- Do not use real customer data in tests, fixtures or examples.
