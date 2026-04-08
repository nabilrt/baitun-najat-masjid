# Baitun Najat Expo App

Public Expo app for the existing Baitun Najat website/backend.

## Setup

1. `cd mobile-app`
2. `npm install`
3. Copy env:

   `cp .env.example .env`

4. For local backend development, change:

   `EXPO_PUBLIC_API_BASE_URL=http://127.0.0.1:3000`

5. Start Expo:

   `npm run start`

## Asset Export

The Expo config now expects these PNG files:

- `mobile-app/assets/icon.png`
- `mobile-app/assets/adaptive-icon.png`
- `mobile-app/assets/favicon.png`
- `mobile-app/assets/splash.png`

Source artwork lives here:

- `mobile-app/assets/brand-mark.svg`
- `mobile-app/assets/splash-art.svg`

Generate the PNG assets with:

`npm run assets:export`

The export script will use the first available tool from:

- `inkscape`
- `rsvg-convert`
- `qlmanage` (macOS)

## Notes

- The app is public and does not require authentication.
- App sections are backed by the website via `/api/mobile/*`.
- Donation submission posts to the existing website donation flow through the new mobile API.
- The default production API target is `https://baitun-najat-masjid.vercel.app`.
- `mobile-app/app.config.ts` is the active Expo config for icon/splash wiring.
