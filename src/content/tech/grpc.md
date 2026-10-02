---
label: "gRPC"
group: "backend"
aliases: ["protobuf"]
---
## rules
- Change `.proto` files only in backward compatible ways. Add new fields with new numbers.
- Mark removed fields and numbers as `reserved`.
- Set a deadline on every client call.
- Return standard status codes such as `NOT_FOUND` and `INVALID_ARGUMENT` with a clear message.
- Generate code from `.proto` files with the tool of the repo. Do not edit generated code.

## ask-first
- Make a breaking change to a published service or message.
