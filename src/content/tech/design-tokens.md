---
label: "Design tokens"
group: "design"
aliases: ["tokens"]
---
## rules
- Keep tokens in one source file and generate platform outputs from it.
- Name tokens by purpose, for example `color-text-muted`, not by value.
- Reference base tokens from semantic tokens. Components use only semantic tokens.
- Define light and dark values for every color token.
- Check contrast for each text and background token pair.

## ask-first
- Rename or remove a token that code already uses.
