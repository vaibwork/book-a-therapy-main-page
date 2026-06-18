# BookaTherapy Hub — Native App (Android & iOS)

The "Who are you?" hub is wrapped as a native app with **Capacitor 8**. This is the
same approach as the patient app, with the redirect behaviour the customer asked for.

## How it behaves (no address bar, ever)

- The app **loads the live hub directly** from `https://app.bookatherapy.com`
  (`capacitor.config.json → server.url`) as its first screen, so the hub UI always matches
  production. (A bundled copy of `dist` ships as a fallback but isn't used while online.)
- When the user taps **Patient / Practitioner / Clinic**, the page redirects to the live
  portal (`www` / `practitioner` / `clinic` `.bookatherapy.com`).
- Those hosts (plus Stripe + Mapbox/Google Maps) are whitelisted in
  `capacitor.config.json → server.allowNavigation`, so **every redirect stays inside the
  app's webview with no browser address bar**. It behaves as one native app the whole way.
- Anything *not* whitelisted (a random external link) opens in the system browser — the
  normal, expected behaviour.
- Because each portal loads at its **real origin**, login/bearer-token auth, the
  `api.bookatherapy.com` calls (CORS), Stripe and maps all work exactly as in a browser.

**Updates:** because the app loads the live site, a web deploy of the **hub or any portal**
updates the app instantly with no resubmission. You only rebuild the app to change native
config — app id, icon, permissions, or the `server.url` itself.

- **App ID:** `com.bookatherapy.hub`  ·  **Name:** BookaTherapy
  - This is intentionally separate from the patient-only app (`com.bookatherapy.app`) so
    both can coexist. To make THIS the single official app instead, change `appId` here +
    in `android/app/build.gradle` (namespace + applicationId) + the iOS bundle id, to
    `com.bookatherapy.app`.

---

## Android (✅ already built here)

Signed artifacts are produced and copied to your Downloads:
- `BookaTherapy-hub-v1.apk` — sideload onto any Android phone to test (Settings → allow
  install from unknown sources).
- `BookaTherapy-hub-v1.aab` — **this is the file you upload to Google Play**.

Source outputs live at:
- `android/app/build/outputs/apk/release/app-release.apk`
- `android/app/build/outputs/bundle/release/app-release.aab`

### Rebuild Android
```bash
npm run build
npx cap sync android
cd android
JAVA_HOME="C:/Program Files/Java/jdk-23" ./gradlew assembleRelease bundleRelease
```
Bump `versionCode` / `versionName` in `android/app/build.gradle` before each Play upload.

### ⚠️ Signing keystore — BACK THIS UP FOREVER
The release is signed with an **upload keystore** (git-ignored, never committed):
- `android/upload-keystore.jks` — alias `upload`, store/key password `BookaTherapy@2026`
- config in `android/keystore.properties`

**Copy `upload-keystore.jks` + the password to a safe place.** If you lose it you cannot
ship updates to the same Play listing (unless you use Play App Signing key reset). Both
files are listed in `.gitignore`.

---

## iOS (⚙️ config-ready — needs an Apple account + one cloud build)

There is **no Mac required** — iOS builds in the cloud via **Codemagic** (`codemagic.yaml`).
The Xcode project is scaffolded with: privacy usage strings + `ITSAppUsesNonExemptEncryption`
in `ios/App/App/Info.plist`, and a shared `App` scheme (required by CI).

One-time setup:
1. **Apple Developer Program** membership ($99/yr).
2. In **App Store Connect**, create the app with bundle id **`com.bookatherapy.hub`**.
3. In **Codemagic**: Teams → Integrations → App Store Connect → add an API key named
   **`CodemagicAppStoreKey`** (must match `integrations` in `codemagic.yaml`).
4. Connect this GitHub repo to Codemagic and run the **`ios-release`** workflow.
   - It runs `npm run build` → `npx cap sync ios` (installs CocoaPods on the Mac) →
     auto-signs via the API key → builds a signed IPA → uploads to **TestFlight**.
5. To go live, flip `submit_to_app_store: true` in `codemagic.yaml`.

### iOS privacy strings already set (so review won't reject)
Location ("find therapists near you"), Photo Library (read + add), and Camera — matching
what the portals use inside the webview.

---

## Files added for the app
- `capacitor.config.json` — app id/name, `webDir`, `allowNavigation` whitelist, splash/status bar
- `android/` — native Android project (signed release configured)
- `ios/` — native iOS project (privacy strings + shared scheme)
- `codemagic.yaml` — cloud iOS build/publish
- `assets/icon.png` + `assets/splash.png` — brand source; regenerate all sizes with
  `npx capacitor-assets generate`
