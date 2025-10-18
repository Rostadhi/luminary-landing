# Luminary Landing (Expo)

A small Expo + React Native project demonstrating a landing page driven by Kontent.ai (headless CMS). The app includes light/dark theming, a hero header, and a list of feature cards populated from the CMS.

## Quick start

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the app
   ```bash
   npx expo start
   ```

Open on device/simulator or web via the Expo devtools.

## Project structure (important files)

- App entry: [App.js](App.js)
- Main landing page (example implementation): [views/landing-screen.js](views/landing-screen.js)
- Expo Router tabs: [app/(tabs)/index.tsx](app/(tabs)/index.tsx)
- Kontent.ai fetcher: [`fetchLandingData`](service/api-service.js) — see [service/api-service.js](service/api-service.js)
- UI pieces:
  - Hero header: [components/header-hero.js](components/header-hero.js)
  - Feature card: [components/feature.js](components/feature.js)
  - Themed helpers: [components/themed-view.tsx](components/themed-view.tsx) and [components/themed-text.tsx](components/themed-text.tsx)
- Theme colors: [constants/theme.ts](constants/theme.ts)
- Color scheme hook: [hooks/use-color-scheme.ts](hooks/use-color-scheme.ts)

## How the landing page works

- The landing content is fetched from Kontent.ai using the delivery endpoint defined in [service/api-service.js](service/api-service.js) via the [`fetchLandingData`](service/api-service.js) function.
- Landing components parse the delivery response and map modular content to cards:
  - Hero data -> [components/header-hero.js](components/header-hero.js)
  - Linked feature items -> [components/feature.js](components/feature.js)

See [views/landing-screen.js](views/landing-screen.js) and [app/(tabs)/index.tsx](app/(tabs)/index.tsx) for two example implementations of the landing screen.

## Development notes

- TypeScript config: [tsconfig.json](tsconfig.json)
- To reset this starter project (moves existing code to `app-example` and creates a blank `app`), run:
  ```bash
  npm run reset-project
  ```
  See [scripts/reset-project.js](scripts/reset-project.js).

## Styling & theming

- Colors and fonts are defined in [constants/theme.ts](constants/theme.ts).
- Use `ThemedView` and `ThemedText` components to respect light/dark themes: [components/themed-view.tsx](components/themed-view.tsx), [components/themed-text.tsx](components/themed-text.tsx).

## Extending / customizing

- To change the Kontent.ai endpoint or item codenames, edit the API constant in [service/api-service.js](service/api-service.js).
- Add or modify content mappers in [views/landing-screen.js](views/landing-screen.js) or [app/(tabs)/index.tsx](app/(tabs)/index.tsx) depending on which file you use as the landing implementation.

## License

Private project.
