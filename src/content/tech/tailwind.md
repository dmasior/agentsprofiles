---
label: "Tailwind CSS"
group: "frontend"
aliases: ["tailwindcss", "css"]
---
## rules
- Use theme values for color, spacing and type. Do not add arbitrary values such as `w-[37px]` without a reason.
- Add new theme values in the Tailwind theme config or the `@theme` block, not inline.
- Extract repeated class lists into a component, not into `@apply` rules.
- Write full class names in source code. Do not build class names from string parts.
- Keep class order consistent. Use the Prettier Tailwind plugin if the repo has it.
