## MarketCy

React Native app for a market/shopping experience with products, basket, orders, worker tools, and i18n.

### Prerequisites
- Node 16/18 and Yarn or npm
- Xcode (iOS) and Android Studio + SDKs (Android)
- CocoaPods (iOS): `sudo gem install cocoapods`

### Install
```bash
yarn install
# iOS only
cd ios && pod install && cd ..
```

### Run
```bash
# Start Metro
yarn start

# iOS
yarn ios

# Android (emulator or device)
yarn android
```

### Scripts
- `yarn start` – start Metro bundler
- `yarn ios` – build and run iOS app
- `yarn android` – build and run Android app
- `yarn lint` – run eslint
- `yarn test` – run Jest
- `yarn openapi:dev` – regenerate API client from dev server
- `yarn openapi:local` – regenerate API client from local server

### API Client
OpenAPI client is generated into `src/services/openapi`. Base URL is set in `app/app.js` via `OpenAPI.BASE`.

### Internationalization (i18n)
Translations live under `app/screens/translation`. Languages: `en`, `fa`, `tr`, `uk`. Initialized in `app/screens/translation/i18n.js`.

### Firebase & Push
- iOS: `ios/GoogleService-Info.plist` is included.
- Android: `android/app/google-services.json` is included.
Ensure bundle identifiers/package names match your Firebase project if you fork.

### Maps
Uses `react-native-maps`. Verify iOS and Android map setup if enabling map features.

### Troubleshooting
- Metro cache issues:
  ```bash
  rm -rf $TMPDIR/metro-* && yarn start --reset-cache
  ```
- Android build issues:
  ```bash
  cd android && ./gradlew clean && cd ..
  ```
- iOS Pod issues:
  ```bash
  cd ios && pod deintegrate && pod install && cd ..
  ```
- “Type annotations can only be used in TypeScript files.”
  This project uses JavaScript. Remove Flow/TS annotations from `.js` files or convert to TypeScript.

### Project Structure (selected)
```
app/
  app.js
  screens/
    products/, basket/, workerScreens/, auth/, translation/
  router/
  components/
  store/
src/services/openapi/   # generated API client
ios/, android/          # native projects
```

### License
MIT (or project default)


