# Baitun Najat Jame Mosjid

A Next.js site for the mosque with prayer times, hadiths, and bKash donations.

## Setup

1. Install dependencies: `npm install`
2. Copy env: `cp .env.example .env.local`
3. Run dev server: `npm run dev`

## Migrate Local SQLite to Turso

If you have data in `data/baitun-najat.db`, you can copy it to Turso:

1. Set `TURSO_URL` and `TURSO_AUTH_TOKEN` in `.env.local`.
2. Run: `npm run migrate:turso`

If your Turso DB already has data and you want to overwrite it, run:

`npm run migrate:turso -- --force`

## Admin Login

Set credentials in `.env.local`:

- `ADMIN_USER`
- `ADMIN_PASS`
- `ADMIN_SECRET`

Open `/admin` to sign in.

## Notes

- Uses libSQL (Turso) via `@libsql/client`. Provide `TURSO_URL` and `TURSO_AUTH_TOKEN`.
- If no Turso env is set, it falls back to a local file DB at `data/baitun-najat.db`.
