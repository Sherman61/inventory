# Inventory Tracker Monorepo

This repository contains a NestJS + Prisma backend, React web app, Expo mobile app, and Electron desktop shell.

## Project structure

- `backend/` — NestJS API with Prisma + MySQL
- `web/` — React (Vite) web client
- `mobile/` — Expo React Native app
- `desktop/` — Electron shell for the web UI
- `full_command.sql` — database schema + sample data

## Backend setup (NestJS + Prisma)

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Environment variables:

- `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`
- `DATABASE_URL` (Prisma expects this)
- `PORT` (default `3000`)
- `IS_ADMIN` (default `false`)

API base URL: `http://localhost:3000/api`

## Web app (React + Vite)

```bash
cd web
npm install
npm run dev
```

Optional API override:

```bash
VITE_API_BASE=http://localhost:3000/api npm run dev
```

## Mobile app (Expo)

```bash
cd mobile
npm install
EXPO_PUBLIC_API_BASE=http://localhost:3000/api npm run start
```

## Desktop app (Electron)

```bash
cd desktop
npm install
npm run dev
```

The desktop shell loads the Vite dev server in development. For production, build the web app first:

```bash
cd web
npm run build
```

Then launch Electron:

```bash
cd ../desktop
NODE_ENV=production npm run start
```

## Database bootstrap

Run `full_command.sql` against your MySQL instance to create tables and sample data.
