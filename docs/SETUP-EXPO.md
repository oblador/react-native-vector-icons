# Setup guide for Expo Apps

> If you use React Native without Expo, please follow [this guide](./SETUP-REACT-NATIVE.md) instead. This guide applies to Expo apps only.

Icon packages from `@react-native-vector-icons` work out of the box with Expo, across all platforms. No additional configuration is required.

> [!WARNING]  
> Avoid Manual Font Duplication: do not add fonts from `node_modules/@react-native-vector-icons/some-font` to `expo-font` plugin configuration unless you have a specific advanced use case.


> [!Troubleshooting]  
> Icons are not showing on iOS:  
> The order of imports at your app's entry point is important. Import `expo` or `expo-router` before importing this one. If this library is imported before Expo is initialized, icons may not display correctly.
> ```javascript
> // Import Expo first, before your App component
> import { registerRootComponent } from 'expo'; 
> import App from './App';
> 
> registerRootComponent(App);
> ```
