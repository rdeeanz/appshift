# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run Next.js linter
pnpm seed         # Seed database with sample data (clears existing data first)
pnpm payload      # Run Payload CLI commands
```

There are no automated tests in this project.

## Local Database Setup

Spin up PostgreSQL via Docker:
```bash
docker compose up -d
```

Copy `.env.example` to `.env` and set `PAYLOAD_SECRET`. The Docker defaults in `.env.example` match `docker-compose.yml` so `DATABASE_URL` works as-is locally.

After starting the DB, run migrations automatically on first `pnpm dev`, then optionally seed:
```bash
pnpm seed  # creates admin@appshift.io / (value of SEED_ADMIN_PASSWORD)
```

## Architecture

AppShift is a **Next.js 15 App Router** app with **Payload CMS 3** co-located in the same process — no separate CMS server.

### Route groups

- `app/(app)/` — public-facing app, shared layout with navbar/footer
  - `(marketing)/` — homepage, `/browse`, `/blog`, `/categories`, `/editors-pick`, `/apps/[slug]`, auth pages
  - `dashboard/` — admin/editor-only content management UI (role-gated server component)
  - `seed/` — HTTP-triggered seed endpoint (protected by `SEED_TOKEN`)
- `app/(payload)/` — Payload's own admin UI at `/admin`

### Data layer

All data access goes through the Payload local API (`getPayload({ config: configPromise })`). There is no direct SQL or ORM usage in application code. Pages are mostly `force-dynamic` server components that call `payload.find()` / `payload.findGlobal()`.

**Collections:** `apps`, `categories`, `posts`, `users`, `media`  
**Globals:** `hero` (homepage hero copy), `stats` (stats bar numbers)

The `apps` collection has a `heroImage` relationship to `media` and an `isFeatured` boolean used to populate the Featured Spotlight section.

### Server Actions

Dashboard mutations live in `app/(app)/dashboard/`:
- `app-actions.ts` — create/update/delete apps (handles media upload via `payload.create` on the `media` collection)
- `blog-actions.ts` — create/update/delete posts
- `user-actions.ts` — admin-only user management

All actions re-authenticate via `payload.auth({ headers })` and check `user.role` before mutating. They call `revalidatePath()` on affected routes after mutations.

### Payload schema

Defined entirely in `payload.config.ts` (not split into separate collection files). After changing the schema, regenerate TypeScript types:
```bash
pnpm payload generate:types
```

Migrations are created with:
```bash
pnpm payload migrate:create
```

### Styling

Tailwind CSS with a CSS-variable design token system. Tokens are defined in `app/(app)/globals.css` under `:root` and `[data-theme='dark']`. Tailwind is configured to use these tokens as named colors (`bg`, `surface`, `txt`, `muted`, `accent`, etc.) in `tailwind.config.ts`.

Reusable CSS component classes (`btn-primary`, `app-card`, `badge-*`, `plat-tag`, `feat-tag`) are defined in the `@layer components` block in `globals.css` — prefer these over one-off Tailwind classes.

Dark mode is toggled via `data-theme` attribute on the root element using `next-themes`.
