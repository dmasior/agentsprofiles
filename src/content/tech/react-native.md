---
label: "React Native"
group: "mobile"
aliases: ["rn"]
---
## rules
- Use `FlatList` or `FlashList` for long lists. Do not render long lists with `map` in a `ScrollView`.
- Use `StyleSheet.create` or the styling library of the repo. Do not create style objects in each render.
- Handle safe areas with `react-native-safe-area-context`.
- Test on both iOS and Android before you report a UI task as done.
- Use `Platform.select` or `.ios.tsx` and `.android.tsx` files for platform differences.
