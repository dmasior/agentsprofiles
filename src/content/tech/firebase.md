---
label: "Firebase"
group: "infra"
---
## rules
- Write Firestore and Storage security rules for every collection and path. Test them with the emulator.
- Use the Firebase Emulator Suite for local development and tests.
- Validate data in security rules or Cloud Functions. Do not trust the client.
- Structure Firestore data for the queries that the app runs. Add composite indexes in `firestore.indexes.json`.

## never
- Do not deploy security rules that allow open read or write access.
