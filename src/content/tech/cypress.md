---
label: "Cypress"
group: "testing"
aliases: ["e2e"]
commands:
  test: "npx cypress run"
---
## rules
- Select elements with `data-cy` or `data-testid` attributes, not CSS classes.
- Do not use `cy.wait` with a fixed time. Wait for requests with `cy.intercept` aliases or for elements.
- Make each test independent. Do not depend on the state from another test.
- Log in through the API or `cy.session`, not through the UI in each test.
- Stub external services with `cy.intercept`.
