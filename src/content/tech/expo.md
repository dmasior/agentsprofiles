---
label: "Expo"
group: "mobile"
commands:
  run: "npx expo start"
---
## rules
- Add native packages with `npx expo install` so that versions match the SDK.
- Use Expo Router for navigation. <!-- not: legacy-maintenance -->
- Configure the app in `app.json` or `app.config.ts`. Use config plugins for native changes.
- Do not edit the generated `ios/` and `android/` folders when the project uses prebuild.
- Expose only environment variables with the `EXPO_PUBLIC_` prefix to app code.

## ask-first
- Upgrade the Expo SDK version.
