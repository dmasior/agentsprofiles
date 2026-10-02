---
label: "Playwright"
group: "testing"
aliases: ["e2e"]
commands:
  test: "npx playwright test"
---
## rules
- Use role-based locators such as `getByRole` and `getByLabel`. Use `getByTestId` only when no role fits.
- Use web-first assertions such as `await expect(locator).toBeVisible()`. Do not use fixed timeouts.
- Make each test independent. Use fixtures for setup.
- Save the logged-in state with `storageState` instead of logging in through the UI in each test.
- Mock external services with `page.route`.
