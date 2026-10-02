---
label: "Jupyter"
group: "data-ml"
aliases: ["notebook", "ipynb"]
---
## rules
- Make notebooks run top to bottom after a kernel restart.
- Clear outputs before you commit, unless the repo keeps outputs on purpose.
- Move reusable code from notebooks into Python modules.
- Read paths and credentials from config or environment variables. Do not hard-code them.
- Pin package versions in the environment file of the project.
